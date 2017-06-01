'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _immutable.Map)();
    var _ref = arguments[1];
    var type = _ref.type,
        payload = _ref.payload;

    switch (type) {
        case "@@loadAppReal":
            return loadApp(state, payload);
        case "@@reduce":
            return reduce(state, payload);
        case "@@clearAppState":
            return clearAppState(state, payload);
        default:
            return state;
    }
};

var _immutable = require('immutable');

var _wrapMapStateToProps = require('./wrapMapStateToProps');

var _wrapMapStateToProps2 = _interopRequireDefault(_wrapMapStateToProps);

var _wrapMapDispatchToProps = require('./wrapMapDispatchToProps');

var _wrapMapDispatchToProps2 = _interopRequireDefault(_wrapMapDispatchToProps);

var _createReduxConnector = require('./createReduxConnector');

var _createReduxConnector2 = _interopRequireDefault(_createReduxConnector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadApp(state, _ref2) {
    var path = _ref2.path,
        _ref2$component = _ref2.component,
        component = _ref2$component === undefined ? {} : _ref2$component,
        _ref2$action = _ref2.action,
        action = _ref2$action === undefined ? {} : _ref2$action,
        _ref2$reducer = _ref2.reducer,
        reducer = _ref2$reducer === undefined ? {} : _ref2$reducer;

    var p = path.split('?'),
        source = path;
    path = p[0];
    var query = p[1] || '';
    if (!state.has(path)) {
        state = state.set(path, (0, _immutable.Map)());
        state = state.setIn([path, '@@require'], (0, _immutable.Map)({ component: component, action: action, reducer: reducer }));
    }
    if (!state.getIn([path, '@@require', source])) {
        var container = (0, _createReduxConnector2.default)(component, (0, _wrapMapStateToProps2.default)(source), (0, _wrapMapDispatchToProps2.default)(source, action, reducer), null, {
            withRef: true,
            pure: true
        });

        state = state.setIn([path, '@@require', source], container);
    }

    if (query !== '' && !state.get(path).has(query)) {
        state = state.update(path, function (x) {
            return x.set(query, (0, _immutable.Map)());
        });
    }

    return state;
}

function clearAppState(state, _ref3) {
    var path = _ref3.path;

    var p = path.split('?'),
        source = path;
    path = p[0];
    var query = p[1] || '';
    if (!state.has(path)) return state;
    if (query !== '' && state.get(path).has(query)) {
        state = state.update(path, function (x) {
            return x.set(query, (0, _immutable.Map)());
        });
    } else {
        var ks = [];
        state.get(path).mapKeys(function (k) {
            if (k != '@@require' && k.indexOf('=') == -1) ks.push(k);
            return k;
        });

        ks.forEach(function (k) {
            if (k) state = state.update(path, function (x) {
                return x.remove(k);
            });
        });
    }
    return state;
}

function reduce(state, _ref4) {
    var reducer = _ref4.reducer,
        type = _ref4.type,
        payload = _ref4.payload,
        path = _ref4.path,
        query = _ref4.query,
        injectFunsForReducer = _ref4.injectFunsForReducer;

    var oldState = query !== '' ? state.getIn([path, query]) : state.get(path);
    var newState = reducer[type].apply(this, [oldState].concat(payload));
    if (typeof newState === "function") {
        newState = newState(injectFunsForReducer);
    }
    return query !== '' ? state.setIn([path, query], newState) : state.set(path, newState);
}
module.exports = exports['default'];