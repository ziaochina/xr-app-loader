class reducer{
	constructor(option){
	}

	setCurrentAppPath(state, currentAppPath) {
		return state.set('currentAppPath', currentAppPath)
	}
}

Object.defineProperties(reducer, {
  "setCurrentAppPath": {
    enumerable : true
  }
})


export default function creator(option){
	return new reducer(option)
}