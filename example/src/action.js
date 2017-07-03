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
}


export default function creator(option){
	return new action(option)
}