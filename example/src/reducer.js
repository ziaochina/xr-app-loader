class reducer{
	constructor(option){
	}

	setCurrentAppPath(state, currentAppPath) {
		return state.set('currentAppPath', currentAppPath)
	}

	getPublishMethods(){
		return {
			setCurrentAppPath:this.setCurrentAppPath
		}
	}
}



export default function creator(option){
	return new reducer(option).getPublishMethods()
}