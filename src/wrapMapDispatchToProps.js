import {
	bindActionCreators
} from 'redux'
import parseName from './parseName'

export default function wrapMapDispatchToProps(fullName, actionCreators, reducer) {
	const parsedName = parseName(fullName),
		wrapActionCreators = {},
		keys = Object.keys(actionCreators)

	for (let i = 0; i < keys.length; i++) {
		let key = keys[i]
		let wrapActionCreator = wrapAction(actionCreators[key], reducer, parsedName.name, parsedName.query)
		wrapActionCreators[key] = wrapActionCreator
	}

	return dispatch => {
		return {...bindActionCreators(wrapActionCreators, dispatch)
		}
	}
}

function wrapAction(actionCreator, reducer, name, query) {
	return (...args) => {
		return function() {
			return {
				name,
				query,
				actionCreator,
				reducer,
				args
			}
		}
	}
}