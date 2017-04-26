import React from "react"
import InputCSS from './InputText.css'
export default class InputText extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        if(this.props.onTextChange){
            this.props.onTextChange(event);
        }
    }

    getText(){
        return this.inpText.value;
    }
    
    render(){
        return (
             <input className="form-input" ref={(ref) => this.inpText = ref} type={this.props.type} placeholder={this.props.placeholder} onChange={this.handleChange}/>
        );
    }
}