import {
	Map
} from 'immutable'

export function initView(state = Map()) {
	return state.set('text', '这是helloWorld app!')
}