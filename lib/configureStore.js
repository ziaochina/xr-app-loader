'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxLogger = require('redux-logger');

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _reduxPromise = require('redux-promise');

var _reduxPromise2 = _interopRequireDefault(_reduxPromise);

var _redux = require('redux');

var _DevTools = require('./DevTools');

var _DevTools2 = _interopRequireDefault(_DevTools);

var _apps = require('../apps');

var _apps2 = _interopRequireDefault(_apps);

var _appLoader = require('appLoader');

var _context = require('../context');

var contextUtil = _interopRequireWildcard(_context);

var _utils = require('../utils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 调用日志打印方法
// 引入DevTools调试组件

// redux-thunk 支持 dispatch function，并且可以异步调用它
var loggerMiddleware = (0, _reduxLogger2.default)();

// 创建一个中间件集合
//const middleware = [thunk, loggerMiddleware]
// 引入redux createStore、中间件及compose 
// 利用redux-logger打印日志
var middleware = [(0, _appLoader.appMiddleware)(_apps2.default, (0, _extends3.default)({}, _utils.fetchWrapper, contextUtil), (0, _extends3.default)({}, contextUtil)), _reduxThunk2.default, _reduxPromise2.default, loggerMiddleware];
// 利用compose增强store，这个 store 与 applyMiddleware 和 redux-devtools 一起使用
var finalCreateStore = (0, _redux.compose)(_redux.applyMiddleware.apply(undefined, middleware), _DevTools2.default.instrument())(_redux.createStore);

exports.default = finalCreateStore;

//要做的处理-线上环境不启用createlogger、启用异步、store 增强器、(统一标准化)

module.exports = exports['default'];