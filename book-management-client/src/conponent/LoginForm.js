import React from "react"
import Button from "./Button"
import InputText from "./InputText"

export default class LoginForm extends React.Component {
    constructor(props){
        super(props);
        this.onButtonLoginClicked = this.onButtonLoginClicked.bind(this);
       
        this.handleClickSignUp = this.handleClickSignUp.bind(this)
    }

    onButtonLoginClicked(e){
        console.log("on Login clicked");
    }

    handleClickSignUp(e){
        
        if(this.props.handleClickSignUp){
            console.log("11")
            this.props.handleClickSignUp(e);
        }
    }

    render(){
        return (
            <form className="form">
                <InputText type="text" placeholder="username" ref={(ref) => this.inpUsername = ref}/>
                <InputText type="password" placeholder="password" ref={(ref) => this.inpPassword = ref}/>
                <Button name="LOGIN" onClick={this.onButtonLoginClicked}/>
                <p className="message">Not registered? <a onClick={this.handleClickSignUp} style={{cursor: 'pointer'}}>Create an account</a></p>
            </form>
        )
    }
}