import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import { createLogger } from 'redux-logger'
import { Map } from 'immutable'
import { AppLoader, appMiddleware, reducer } from 'xr-app-loader'
import apps from './apps'

const middleware = [appMiddleware(apps), createLogger({})]

const store = createStore(reducer, Map(), applyMiddleware(...middleware))

render(
	<Provider store ={store}>
		<AppLoader path='apps/root' />
	</Provider>,
	document.getElementById('app')
)
