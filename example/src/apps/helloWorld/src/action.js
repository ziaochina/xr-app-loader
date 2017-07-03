class action(){
	initView(){
		return injections => {
			injections.reduce('initView')
		}
	}
}

export default function creator(option){
	return new action()
}
