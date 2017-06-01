'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.default = wrapMapDispatchToProps;

var _redux = require('redux');

var _parseUrl = require('./parseUrl');

var _parseUrl2 = _interopRequireDefault(_parseUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function wrapMapDispatchToProps(appPath, actionCreators, reducer) {
	var url = (0, _parseUrl2.default)(appPath);

	var wrapActionCreators = {};
	var keys = (0, _keys2.default)(actionCreators);
	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		var wrapActionCreator = wrapAction(actionCreators[key], reducer, url.path, url.query);
		wrapActionCreators[key] = wrapActionCreator;
	}

	return function (dispatch) {
		return (0, _extends3.default)({}, (0, _redux.bindActionCreators)(wrapActionCreators, dispatch));
	};
}

function wrapAction(actionCreator, reducer, path, query) {
	return function () {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return function () {
			return {
				path: path,
				query: query,
				actionCreator: actionCreator,
				reducer: reducer,
				args: args
			};
		};
	};
}
module.exports = exports['default'];