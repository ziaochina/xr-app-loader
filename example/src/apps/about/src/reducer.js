import {
	Map
} from 'immutable'


class reducer{
	initView(state = Map()) {
		return state.set('text', '这是about app!')
	}

	getPublishMethods(){
		initView:this.initView
	}
}


export default function creator(option){
	return new reducer(option).getPublishMethods()
}

