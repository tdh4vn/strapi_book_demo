import React from "react"

import InputText from "./InputText"
import validator from 'validator';
import Button  from './Button';
import ActionCreater from '../actions/index'; 
const UserService = require('../services/User.service')

export default class LoginForm extends React.Component {
    constructor(props){
        super(props);
        this.onButtonCreateClicked = this.onButtonCreateClicked.bind(this);
        this.handleClickSignIn = this.handleClickSignIn.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onLoginListener = this.onLoginListener.bind(this);
        this.state = {
            isValidate : false,
            isRegisterSucess : true
        }
        this.isLoading = false;
    }

    onButtonCreateClicked(e){
        if(this.state.isValidate){
            this.btnCreate.changeLoading(true);
            UserService.registerAPI(
                this.inpUsername.getText(),
                this.inpPassword.getText(),
                this.inpEmail.getText(),
                (err, body) => {
                    this.btnCreate.changeLoading(false);
                    if(err){
                        dispatch()
                    } else {
                        console.log(response);
                        if(response.statusCode === 200){
                            
                            //navigate to management page
                            this.setState({
                                isRegisterSucess : true
                            })
                            var bodyJSON = JSON.parse(body);
                            console.log(bodyJSON.jwt);
                            localStorage.setItem("jwt", bodyJSON.jwt);
                            localStorage.setItem("username", bodyJSON.user.username);
                            this.onLoginListener(true);
                        } else {
                            this.messageRegister = "Register failed"
                            this.setState({
                                isRegisterSucess : false
                            })
                        }
                        console.log(body);
                    }
                })
        }
    }

    validatorInput(username, password, email){
        let usernameRegex = /^[a-zA-Z0-9]+$/;
        let passwordRegex = (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);
        if(!validator.isEmpty(email) && !validator.isEmail(email) ){
            this.messageValidator = "Email not validated"
            this.setState({
                isValidate : false
            })
            return;
        } else if(!validator.isEmpty(username) && !username.match(usernameRegex)){
            this.messageValidator = "Username not validated"
            this.setState({
                isValidate : false
            })
            return;
        } else if(!validator.isEmpty(password) && password.length < 8){
            this.messageValidator = "Password not validated"
            this.setState({
                isValidate : false
            })
            return;
        }
        this.messageValidator = "";
        this.setState({
            isValidate : true
        })
    }

    onTextChange(e){
        this.validatorInput(this.inpUsername.getText(), this.inpPassword.getText(), this.inpEmail.getText());
    }
    
    handleClickSignIn(e){
        if(this.props.handleClickSignIn){
            this.props.handleClickSignIn(e);
        }
    }

    onLoginListener(result){
        if(result && this.props.onLoginListener){
            this.props.onLoginListener(result);
        }
    }

    render(){
        return (
            <form className="form" style={{"display ": "block"}}>
                <InputText type="text" placeholder="username" ref={(ref) => this.inpUsername = ref} onTextChange={this.onTextChange}/>
                <InputText type="password" placeholder="password" ref={(ref) => this.inpPassword = ref} onTextChange={this.onTextChange}/>
                <InputText type="text" placeholder="email address" ref={(ref) => this.inpEmail = ref} onTextChange={this.onTextChange}/>
                <p className="message">{this.state.isValidate ? "" : this.messageValidator}</p>
                <p className="message">{this.state.isRegisterSucess ? "" : this.messageRegister}</p>
                <Button name="CREATE" nameLoading="CREATING..." ref={(ref) => this.btnCreate = ref} onButtonClick={this.onButtonCreateClicked}/>
                <p className="message">Already registered? <a onClick={this.handleClickSignIn} style={{cursor: 'pointer'}}>Sign In</a></p>
            </form>
        )
    }
}