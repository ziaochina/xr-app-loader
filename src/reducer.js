import {
    Map
} from 'immutable'
import wrapMapStateToProps from './wrapMapStateToProps'
import wrapMapDispatchToProps from './wrapMapDispatchToProps'
import createReduxConnector from './createReduxConnector'

export default function(state = Map(), {
    type,
    payload
}) {
    switch (type) {
        case "@@loadAppReal":
            return loadApp(state, payload)
        case "@@reduce":
            return reduce(state, payload)
        case "@@clearAppState":
            return clearAppState(state, payload)
        default:
            return state
    }
}


function loadApp(state, {
    fullName,
    component = {},
    action = {},
    reducer = {}
}) {
    const p = fullName.split('?'),
        name = p[0],
        query = p[1] || ''

    if (!state.has(name)) {
        state = state.set(name, Map())
        state = state.setIn([name, '@@require'], Map({
            component,
            action,
            reducer
        }))
    }
    if (!state.getIn([name, '@@require', fullName])) {
        let container = createReduxConnector(component,
            wrapMapStateToProps(fullName),
            wrapMapDispatchToProps(fullName, action, reducer),
            null, {
                withRef: true,
                pure: true
            }
        )

        state = state.setIn([name, '@@require', fullName], container)
    }

    if (query !== '' && !state.get(name).has(query)) {
        state = state.update(name, x => x.set(query, Map()))
    }

    return state
}

function clearAppState(state, {
    fullName
}) {
    const p = fullName.split('?'),
        name = p[0],
        query = p[1] || ''

    if (!state.has(name)) return state

    if (query !== '' && state.get(name).has(query)) {
        state = state.update(name, x => x.set(query, Map()))
    } else {
        let ks = []
        state.get(name).mapKeys(k => {
            if (k != '@@require' && k.indexOf('=') == -1)
                ks.push(k)
            return k
        })

        ks.forEach(k => {
            if (k)
                state = state.update(name, x => x.remove(k))
        })
    }
    return state

}


function reduce(state, {
    reducer,
    type,
    payload,
    name,
    query,
    injectFunsForReducer
}) {
    let oldState = query !== '' ? state.getIn([name, query]) : state.get(name)
    let newState = reducer[type].apply(this, [oldState].concat(payload))
    if (typeof newState === "function") {
        newState = newState(injectFunsForReducer)
    }
    return query !== '' ? state.setIn([name, query], newState) : state.set(name, newState)
}