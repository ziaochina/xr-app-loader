import {
	bindActionCreators
} from 'redux'
import parseName from './parseName'

export default function wrapMapDispatchToProps(fullName, actionCreators, reducer) {
	const parsedName = parseName(fullName),
		wrapActionCreators = {},
		keys = Reflect.ownKeys( Reflect.getPrototypeOf(actionCreators))

	for (let i = 0; i < keys.length; i++) {

		let key = keys[i]
		
		if(key === 'directFuns' || key === 'constructor')
			continue

		let wrapActionCreator = wrapAction(actionCreators[key], 
			reducer, parsedName.fullName, parsedName.name, 
			parsedName.query, parsedName.params)
		wrapActionCreators[key] = wrapActionCreator
	}

	return dispatch => {
		return {...bindActionCreators(wrapActionCreators, dispatch), 
			...((actionCreators.getDirectFuns && actionCreators.getDirectFuns(parsedName)) ||  {}) }
	}
}

function wrapAction(actionCreator, reducer, fullName, name, query, params) {
	return (...args) => {
		return function() {
			return {
				fullName,
				name,
				query,
				params,
				actionCreator,
				reducer,
				args
			}
		}
	}
}