class action{
	constructor(option){

	}

	helloWorldClick(){
		return injections => {
			injections.reduce('setCurrentAppPath', 'helloWorld')	
		}
	}

	aboutClick(){
		return injections => {
			injections.reduce('setCurrentAppPath', 'about')	
		}
	}

	getPublishMethods(){
		return {
			helloWorldClick : this.helloWorldClick,
			aboutClick: this.aboutClick
		}
	}
}


export default function creator(option){
	return new action(option).getPublishMethods()
}