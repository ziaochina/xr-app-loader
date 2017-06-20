import React from 'react'

import {
	render
} from 'react-dom'

import {
	createStore,
	applyMiddleware
} from 'redux'

import {
	Provider,
	connect
} from 'react-redux'

import {
	Map
} from 'immutable'

import AppLoader from './appLoader'
import appMiddleware from './appMiddleware'
import reducer from './reducer'


export default function start(targetDomId, middlewares, startAppName) {
	var mw = [appMiddleware()]
	if (middlewares)
		mw = mw.concat(middlewares)

	const store = createStore(reducer, Map(), applyMiddleware(...mw))

	render(
		<Provider store={store}>
			<AppLoader name={startAppName} />
		</Provider>,
		document.getElementById(targetDomId)
	)
}