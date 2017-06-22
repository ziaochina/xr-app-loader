module.exports = {
	name: 'helloWorld',
	version: '0.0.1',
	description: 'helloWorld',
	author: '',
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, 'helloWorld')
	}
}