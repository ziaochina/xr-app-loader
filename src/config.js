import appFactory from './appFactory'


var _option

//option
function config(option) {
	_option = option
}

config.current = _option

export default config