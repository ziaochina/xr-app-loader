import React from 'react'
import { Map } from 'immutable'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './action'
import parseUrl from './parseUrl'

import wrapMapStateToProps from './wrapMapStateToProps'
import wrapMapDispatchToProps from './wrapMapDispatchToProps'
import createReduxConnector from './createReduxConnector'

//import pureMixin from './pureMixin'


class AppLoader extends React.Component{
	constructor(props, context){
		super(props, context)
	}

	componentDidMount(){
		let { path, payload } = this.props
		if( !payload.getIn([ '@@require', path]) ){
			this.props.loadApp(path)
		}
	}

	componentWillReceiveProps(nextProps){
		let { path, payload } = nextProps
		if( !payload.getIn([ '@@require', path]) ){
			this.props.loadApp(path)
		}
	}
	//cxb效率优化点，由主动更新变更为状态比较更新?
	shouldComponentUpdate(nextProps, nextState){
    	return true
    }

    componentWillUnmount(){
    	let { path, payload } = this.props
    	this.props.clearAppState(path)
    }

	render(){
		let { path, payload } = this.props

		if(payload.getIn(['@@require', path]) ){
			let ReduxConnector = payload.getIn(['@@require', path])
			return(
				<ReduxConnector 
					{...this.props} 
					key={path} 
					store ={this.context.store}
				/>
			)

		}
		else{
			return null
		}
	}
}

AppLoader.contextTypes = {
  	store: React.PropTypes.object
}

export default connect((state, props) => {
        let url = parseUrl(props.path),
        	payload = state.get(url.path)
        return {
            payload: payload || Map()
        }
    },
    dispatch => ({...bindActionCreators(actions, dispatch)}), null, {
        withRef: true,
        pure: true
    }
)(AppLoader)
