import {
	Map
} from 'immutable'


class reducer{
	initView(state = Map()) {
		return state.set('text', '这是about app!')
	}
}

Object.defineProperties(initView, {
  "initView": {
    enumerable : true
  }
})

export default function creator(option){
	return new reducer(option)
}

