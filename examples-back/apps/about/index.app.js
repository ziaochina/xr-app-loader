module.exports = {
	name: 'apps/about',
	version: '0.0.1',
	description: 'apps/about',
	author: 'zlj',
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./index'))
		}, 'apps-about')
	}
}

