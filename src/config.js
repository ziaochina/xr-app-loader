import appFactory from './appFactory'

export default function config(option) {
	const {
		apps
	} = option

	appFactory.registerApps(apps)
}