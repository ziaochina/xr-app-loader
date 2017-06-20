export function loadApp(fullName) {
	return {
		type: '@@loadApp',
		payload: {
			fullName
		}
	}
}

export function clearAppState(fullName) {
	return {
		type: '@@clearAppState',
		payload: {
			fullName
		}
	}
}