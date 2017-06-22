export function initView() {
	//injectFuns是appMiddleware注入对象，其中最重要的一个reduce方法可以指定reducer方法名就可以调用
	//避免redux中处理消息的很多代码
	return injectFuns => {
		injectFuns.reduce('initView')
	}
}