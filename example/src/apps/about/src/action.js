class action{
	initView(){
		return injections => {
			injections.reduce('initView')
		}
	}

	getPublishMethods(){
		return {
			initView: this.initView
		}
	}
}



export default function creator(option){
	return new action().getPublishMethods()
}
