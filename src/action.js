export function loadApp(path){
	return {
		type:'@@loadApp',
		payload:{path}
	}
}

export function clearAppState(path){
	return {
		type:'@@clearAppState',
		payload:{path}
	}
}
