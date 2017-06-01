'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = wrapMapStateToProps;

var _parseUrl = require('./parseUrl');

var _parseUrl2 = _interopRequireDefault(_parseUrl);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function wrapMapStateToProps(appPath) {
	var url = (0, _parseUrl2.default)(appPath);

	return function (state) {
		return {
			appPath: url.path,
			appSource: url.source,
			appQuery: url.query,
			appParams: url.params,
			payload: url.query !== '' ? state.getIn([url.path, url.query]) : state.get(url.path)
		};
	};
}
module.exports = exports['default'];