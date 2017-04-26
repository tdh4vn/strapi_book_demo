import React from "react"

export default class InputText extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        validate(event.target.value);
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
             <input className={this.props.className} ref={(inputRef) = this.inpText = inputRef} type={this.props.type} placeholder={this.props.placeholder} onChange={this.handleChange}/>
        );
    }
}