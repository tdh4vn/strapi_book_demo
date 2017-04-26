import React from "react"
import InputCSS from './InputText.css'
export default class InputText extends React.Component {
    constructor(props){
        super(props);
        this.validate = this.validate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    
    }

    handleChange(event){
        this.validate(event.target.value);
        if(this.props.onTextChange){
            this.props.onTextChange(event);
        }
    }

    getText(){
        return this.inpText.value;
    }
    
    validate(value){
        //validate if need
    }

    render(){
        return (
             <input className="form-input" ref={(ref) => this.inpText = ref} type={this.props.type} placeholder={this.props.placeholder} onChange={this.handleChange}/>
        );
    }
}