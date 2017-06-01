'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _action = require('./action');

var actions = _interopRequireWildcard(_action);

var _parseUrl = require('./parseUrl');

var _parseUrl2 = _interopRequireDefault(_parseUrl);

var _wrapMapStateToProps = require('./wrapMapStateToProps');

var _wrapMapStateToProps2 = _interopRequireDefault(_wrapMapStateToProps);

var _wrapMapDispatchToProps = require('./wrapMapDispatchToProps');

var _wrapMapDispatchToProps2 = _interopRequireDefault(_wrapMapDispatchToProps);

var _createReduxConnector = require('./createReduxConnector');

var _createReduxConnector2 = _interopRequireDefault(_createReduxConnector);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import pureMixin from './pureMixin'


var AppLoader = function (_React$Component) {
	(0, _inherits3.default)(AppLoader, _React$Component);

	function AppLoader(props, context) {
		(0, _classCallCheck3.default)(this, AppLoader);
		return (0, _possibleConstructorReturn3.default)(this, (AppLoader.__proto__ || (0, _getPrototypeOf2.default)(AppLoader)).call(this, props, context));
	}

	(0, _createClass3.default)(AppLoader, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _props = this.props,
			    path = _props.path,
			    payload = _props.payload;

			if (!payload.getIn(['@@require', path])) {
				this.props.loadApp(path);
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var path = nextProps.path,
			    payload = nextProps.payload;

			if (!payload.getIn(['@@require', path])) {
				this.props.loadApp(path);
			}
		}
		//cxb效率优化点，由主动更新变更为状态比较更新?

	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			return true;
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			var _props2 = this.props,
			    path = _props2.path,
			    payload = _props2.payload;

			this.props.clearAppState(path);
		}
	}, {
		key: 'render',
		value: function render() {
			var _props3 = this.props,
			    path = _props3.path,
			    payload = _props3.payload;


			if (payload.getIn(['@@require', path])) {
				var ReduxConnector = payload.getIn(['@@require', path]);
				return _react2.default.createElement(ReduxConnector, (0, _extends3.default)({}, this.props, {
					key: path,
					store: this.context.store
				}));
			} else {
				return null;
			}
		}
	}]);
	return AppLoader;
}(_react2.default.Component);

AppLoader.contextTypes = {
	store: _react2.default.PropTypes.object
};

exports.default = (0, _reactRedux.connect)(function (state, props) {
	var url = (0, _parseUrl2.default)(props.path),
	    payload = state.get(url.path);
	return {
		payload: payload || (0, _immutable.Map)()
	};
}, function (dispatch) {
	return (0, _extends3.default)({}, (0, _redux.bindActionCreators)(actions, dispatch));
}, null, {
	withRef: true,
	pure: true
})(AppLoader);
module.exports = exports['default'];