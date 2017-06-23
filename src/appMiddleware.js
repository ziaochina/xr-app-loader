import parseName from './parseName'
import appFactory from './appFactory'

export default (injectFuns, injectFunsForReducer) => (store) => {
	return next => action => {
		const {
			getState,
			dispatch
		} = store

		if (typeof action === 'function') {
			const {
				fullName,
				name,
				query,
				params,
				actionCreator,
				args,
				reducer
			} = action()

			const reduce = (type, ...args) => {
				dispatch({
					type: '@@reduce',
					payload: {
						name,
						query,
						type,
						reducer,
						payload: args,
						injectFunsForReducer
					}
				})
			}

			const getStateByApp = () => query !== '' ? getState().getIn([name, query]) : getState().get(name)
			const realAction = actionCreator(...{
				...args, 
				currentApp:{fullName, name, query, params},
				store,
				reduce,
				getState: getStateByApp,
				...injectFuns
			})
			
			if (typeof realAction === 'function') {
				realAction({
					currentApp:{fullName, name, query, params},
					store,
					reduce,
					getState: getStateByApp,
					...injectFuns
				})
			}

		} else if (action.type && action.type == '@@loadApp') {
			const fullName = action.payload.fullName,
				parsedName = parseName(fullName)

			appFactory.getApp(parsedName.name).load((component, action, reducer) => {
				return next({
					type: '@@loadAppReal',
					payload: {
						fullName,
						component,
						action,
						reducer
					}
				})
			})

		} else {
			return next(action)
		}
	}
}