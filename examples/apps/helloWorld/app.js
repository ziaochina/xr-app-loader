export default {
	name: 'apps/helloWorld',
	version: '0.0.1',
	description: 'apps/helloWorld',
	author: 'zlj',
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./index'), require('./action'), require('./reducer'))
		}, 'apps-helloWorld')
	}
}