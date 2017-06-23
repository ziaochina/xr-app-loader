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
import config from './config'
import appFactory from './appFactory'


export default function start() {
	
	appFactory.registerApps(config.current.apps)

	var mw = [appMiddleware(config.current.actionInjections || {}, config.current.reducerInjections || {})]
	
	if (config.current.middlewares)
		mw = mw.concat(config.current.middlewares)

	const store = createStore(reducer, Map(), applyMiddleware(...mw))

	render(
		<Provider store={store}>
			<AppLoader name={config.current.startAppName} />
		</Provider>,
		document.getElementById(config.current.targetDomId)
	)
}