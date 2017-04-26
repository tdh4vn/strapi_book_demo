import React from "react"
import Button from "./Button"
import InputText from "./InputText"

export default class LoginForm extends React.Component {
    constructor(props){
        super(props);
        this.onButtonLoginClicked = this.onButtonLoginClicked.bind(this);
        this.handleClickSignIn = this.handleClickSignIn.bind(this);

    }

    onButtonLoginClicked(e){
        console.log("on Login clicked");
    }
    
    handleClickSignIn(e){
        if(this.props.handleClickSignIn){
            this.props.handleClickSignUp(e);
        }
    }

    render(){
        return (
            <form className="form" style="display: block;">
                <InputText type="text" placeholder="name" ref={(ref) => this.inpUsername = ref}/>
                <InputText type="password" placeholder="password" ref={(ref) => this.inpPassword = ref}/>
                <InputText type="text" placeholder="email address" ref={(ref) => this.inpEmail = ref}/>
                <Button name="CREATE" onClick={this.onButtonCreateClicked}/>
                <p class="message">Already registered? <a onClick={this.handleClickSignIn} style={{cursor: 'pointer'}}>Sign In</a></p>
            </form>
        )
    }
}