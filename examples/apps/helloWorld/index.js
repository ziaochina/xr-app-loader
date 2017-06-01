import React,{Component} from 'react'

export default class HelloWorldComponent extends Component{

    componentDidMount() {
        this.props.initView()
    }

	render(){
		if(this.props.payload)
			return (<div>{this.props.payload.get('text')}</div>)
		else
			return null
	}
}