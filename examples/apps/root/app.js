export default {
	name: 'root',
	version: '0.0.1',
	description: 'root',
	author: 'zlj',
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./index'), require('./action'), require('./reducer'))
		})
	}
}