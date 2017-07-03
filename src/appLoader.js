import React from 'react'
import {
	Map
} from 'immutable'
import {
	connect
} from 'react-redux'
import {
	bindActionCreators
} from 'redux'
import * as actions from './action'
import parseName from './parseName'

class AppLoader extends React.Component {
	constructor(props, context) {
		super(props, context)
	}

	componentDidMount() {
		const {
			name: fullName,
			payload
		} = this.props

		if (!payload.get('@@require')) {
			this.props.loadApp(fullName)
		}
	}

	componentWillReceiveProps(nextProps) {
		const {
			name: fullName,
			payload
		} = nextProps

		if (!payload.get('@@require')) {
			this.props.loadApp(fullName)
		}
	}

	//cxb效率优化点，由主动更新变更为状态比较更新?
	shouldComponentUpdate(nextProps, nextState) {
		return true
	}

	componentWillUnmount() {
		const {
			name: fullName,
			payload
		} = this.props

		this.props.clearAppState(fullName)
	}

	render() {
		const {
			name: fullName,
			payload,
			...other
		} = this.props,

		ReduxConnector = payload.get('@@require').get('container')

		if (ReduxConnector) {
			return (
				<ReduxConnector 
					{...other} 
					payload = {payload}
					key={fullName} 
					store ={this.context.store}
				/>
			)

		} else {
			return null
		}
	}
}

AppLoader.contextTypes = {
	store: React.PropTypes.object
}

export default connect((state, props) => {
		const payload = state.get(props.name)

		return {
			payload: payload || Map()
		}
	},
	dispatch => ({...bindActionCreators(actions, dispatch)
	}), null, {
		withRef: true,
		pure: true
	}
)(AppLoader)