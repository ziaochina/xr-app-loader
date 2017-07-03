class reducer(){
	constructor(option){
	}

	setCurrentAppPath(state, currentAppPath) {
		return state.set('currentAppPath', currentAppPath)
	}
}

export default function creator(option){
	return new reducer(option)
}