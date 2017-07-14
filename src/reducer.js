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
    appInfo,
    component = {},
    action = {},
    reducer = {}
}) {
    if(!state.has(fullName)){
        state = state.set(fullName, Map())
        
        const actionInstance = action({appInfo, fullName}),
            reducerInstance = reducer({appInfo, fullName}),
            container = createReduxConnector(
                component,
                wrapMapStateToProps(fullName),
                wrapMapDispatchToProps(fullName, actionInstance, reducerInstance),
                null, { withRef: true, pure: true }
            )

        state = state.setIn([fullName, '@@require'], Map({
            fullName,
            appInfo,
            component,
            action:actionInstance,
            reducer:reducerInstance,
            container
        }))
    }

    return state
}

function clearAppState(state, {
    fullName
}) {

    if(!state.has(fullName))
        return this.state

    const ks = []
    state.get(fullName).mapKeys(k=>{
        if (k != '@@require')
            ks.push(k)
        return k
    })

    ks.forEach(k => {
        if (k)
            state = state.update(fullName, x => x.remove(k))
    })

    return state
}


function reduce(state, {
    reducer,
    type,
    payload,
    fullName,
    injectFunsForReducer
}) {

    var oldState = state.get(fullName)
    var newState = reducer[type].apply(this, [oldState].concat(payload))

    if (typeof newState === "function") {
        newState = newState(injectFunsForReducer)
    }
    return state.set(fullName, newState)
}