module.exports = {
	name: 'apps/root',
	version: '0.0.1',
	description: 'apps/root',
	author: 'zlj',
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./index'), require('./action'), require('./reducer'))
		}, 'apps-root')
	}
}