import {
	config,
	start
} from 'xr-app-loader'

import _apps_about from './apps/about/index.app'
import _apps_helloWorld from './apps/helloWorld/index.app'
import _apps_root from './apps/root/index.app'

config({
	apps: {
		[_apps_about.name]: _apps_about,
		[_apps_helloWorld.name]: _apps_helloWorld,
		[_apps_root.name]: _apps_root
	}
})

start('app', null, 'apps/root')