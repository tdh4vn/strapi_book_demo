import React from "react"
import ButtonCSS from './Button.css'
export default class Button extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.changeLoading = this.changeLoading.bind(this);
        this.state = {
            isLoading : false
        }
    }

    changeLoading(loading){
        console.log(loading);
        this.setState({
            isLoading : loading
        })
    }

    handleClick(e){
        if(this.props.onButtonClick){
            this.props.onButtonClick(e);
        }
    }

    render(){
        return(
            <button type="button" className="form-button" disabled={this.state.isLoading} onClick={this.handleClick}>{this.state.isLoading ? this.props.nameLoading : this.props.name}</button>
        )
    }
}