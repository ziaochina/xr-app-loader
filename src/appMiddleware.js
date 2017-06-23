import parseName from './parseName'
import appFactory from './appFactory'

export default (actionInjections, reducerInjections) => (store) => {
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
						reducerInjections
					}
				})
			}

			const getStateByApp = () => query !== '' ? getState().getIn([name, query]) : getState().get(name)
			const injections = {
				currentApp: {
					fullName,
					name,
					query,
					params
				},
				store,
				reduce,
				getState: getStateByApp,
				...actionInjections
			}
			const realAction = actionCreator(
				...args,
				injections
			)

			if (typeof realAction === 'function') {
				realAction(injections)
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