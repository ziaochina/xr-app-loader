'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _parseUrl = require('./parseUrl');

var _parseUrl2 = _interopRequireDefault(_parseUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (apps, injectFuns, injectFunsForReducer) {
	return function (store) {
		return function (next) {
			return function (action) {
				var getState = store.getState,
				    dispatch = store.dispatch;

				if (typeof action === 'function') {
					var _action = action(),
					    path = _action.path,
					    query = _action.query,
					    actionCreator = _action.actionCreator,
					    args = _action.args,
					    reducer = _action.reducer;

					var reduce = function reduce(type) {
						for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
							args[_key - 1] = arguments[_key];
						}

						dispatch({
							type: '@@reduce',
							payload: {
								path: path, query: query, type: type, reducer: reducer, payload: args, injectFunsForReducer: injectFunsForReducer
							}
						});
					};
					var getStateByApp = function getStateByApp() {
						return query !== '' ? getState().getIn([path, query]) : getState().get(path);
					};
					var a = actionCreator.apply(undefined, (0, _toConsumableArray3.default)(args));
					if (typeof a === 'function') a((0, _extends3.default)({ store: store, reduce: reduce, getState: getStateByApp }, injectFuns));
				} else if (action.type && action.type == '@@loadApp') {
					var _path = action.payload.path;
					var url = (0, _parseUrl2.default)(_path);
					apps(url.path, function (component, action, reducer) {
						return next({ type: '@@loadAppReal', payload: { path: _path, component: component, action: action, reducer: reducer } });
					});
				} else {
					return next(action);
				}
			};
		};
	};
};

module.exports = exports['default'];