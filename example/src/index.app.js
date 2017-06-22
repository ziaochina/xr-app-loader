module.exports = {
	name: 'example',
	version: '0.0.1',
	description: 'example',
	author: '',
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, 'example')
	}
}