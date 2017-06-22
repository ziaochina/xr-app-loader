export function helloWorldClick() {
	return injectFuns => {
		injectFuns.reduce('setCurrentAppPath', 'helloWorld')
	}
}

export function aboutClick() {
	return injectFuns => {
		injectFuns.reduce('setCurrentAppPath', 'about')
	}

}