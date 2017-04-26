import React from "react"
import Button from "./Button"
import InputText from "./InputText"

export default class LoginForm extends React.Component {
    constructor(props){
        super(props);
        this.onButtonLoginClicked = this.onButtonLoginClicked.bind(this);
    }

    onButtonLoginClicked(e){
        console.log("on Login clicked");
    }

    render(){
        return (
            <form className="register-form">
                <InputText type="text" placeholder="username" ref={(ref) => this.inpUsername = ref}/>
                <InputText type="password" placeholder="password" ref={(ref) => this.inpPassword = ref}/>
                <Button name="LOGIN" onClick={this.onButtonLoginClicked}/>
                <p className="message">Already registered? <a href="#">Sign In</a></p>
            </form>
        )
    }
}