class action{
	initView(){
		return injections => {
			injections.reduce('initView')
		}
	}
}

Object.defineProperties(action, {
  "initView": {
    enumerable : true
  }
})


export default function creator(option){
	return new action()
}
