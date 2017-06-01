export function helloWorldClick(){
	return injectFuns=>{
		injectFuns.reduce('setCurrentAppPath', 'apps/helloWorld')
	}
}

export function aboutClick(){
	return injectFuns=>{
		injectFuns.reduce('setCurrentAppPath', 'apps/about')
	}

}