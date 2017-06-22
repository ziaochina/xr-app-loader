import {
	config,
	start
} from 'xr-app-loader'

import _src_apps_about_src from './src/apps/about/src/index.app'
import _src_apps_helloWorld_src from './src/apps/helloWorld/src/index.app'
import _src from './src/index.app'

config({
	apps: {
		[_src_apps_about_src.name]: _src_apps_about_src,
		[_src_apps_helloWorld_src.name]: _src_apps_helloWorld_src,
		[_src.name]: _src
	}
})

start('app', null, 'example')