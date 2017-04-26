import React from "react"
import Button from "./Button"
import InputText from "./InputText"
const UserService = require('../services/User.service')

export default class LoginForm extends React.Component {
    constructor(props){
        super(props);
        this.onButtonLoginClicked = this.onButtonLoginClicked.bind(this);
        this.handleClickSignUp = this.handleClickSignUp.bind(this);
        this.onLoginListener = this.onLoginListener.bind(this);
        this.state = {
            isRegisterSucess : true
        }
    }

    onButtonLoginClicked(e){
        this.btnLogin.changeLoading(true);
        UserService.loginAPI(
            this.inpUsername.getText(),
            this.inpPassword.getText(),
            (err, res, body) => {
                this.btnLogin.changeLoading(false);
                if(err){
                    
                } else {
                     if(res.statusCode === 200){
                            //navigate to management page
                            this.setState({
                                isRegisterSucess : true
                            })
                            var bodyJSON = JSON.parse(body);
                            localStorage.setItem("jwt", bodyJSON.jwt);
                            localStorage.setItem("username", bodyJSON.user.username);
                            this.onLoginListener(true);
                        } else {
                            this.loginMessage = "Login failed"
                            this.setState({
                                isRegisterSucess : false
                            })
                        }
                }
            }
        )
    }

    onLoginListener(result){
        if(result && this.props.onLoginListener){
            this.props.onLoginListener(result);
        }
    }

    handleClickSignUp(e){
        if(this.props.handleClickSignUp){
            this.props.handleClickSignUp(e);
        }
    }

    render(){
        return (
            <form className="form">
                <p className="message">{this.state.isLogin ? "" : this.loginMessage}></p>
                <InputText type="text" placeholder="username" ref={(ref) => this.inpUsername = ref}/>
                <InputText type="password" placeholder="password" ref={(ref) => this.inpPassword = ref}/>
                <Button name="LOGIN" nameLoading="LOGGING..." ref={(ref) => this.btnLogin = ref} onButtonClick={this.onButtonLoginClicked}/>
                <p className="message">Not registered? <a onClick={this.handleClickSignUp} style={{cursor: 'pointer'}}>Create an account</a></p>
            </form>
        )
    }
}