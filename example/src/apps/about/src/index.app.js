module.exports = {
	name: 'about',
	version: '0.0.1',
	description: 'about',
	author: '',
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, 'about')
	}
}