'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.loadApp = loadApp;
exports.clearAppState = clearAppState;
function loadApp(path) {
	return {
		type: '@@loadApp',
		payload: { path: path }
	};
}

function clearAppState(path) {
	return {
		type: '@@clearAppState',
		payload: { path: path }
	};
}