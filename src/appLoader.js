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

		if (!payload.getIn(['@@require', fullName])) {
			this.props.loadApp(fullName)
		}
	}

	componentWillReceiveProps(nextProps) {
		const {
			name: fullName,
			payload
		} = nextProps

		if (!payload.getIn(['@@require', fullName])) {
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
			payload
		} = this.props,
			ReduxConnector = payload.getIn(['@@require', fullName])

		if (ReduxConnector) {
			return (
				<ReduxConnector 
					{...this.props} 
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
		const parsedName = parseName(props.name),
			payload = state.get(parsedName.name)

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