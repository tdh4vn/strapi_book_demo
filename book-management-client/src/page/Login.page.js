import React from "react"
import LoginForm from '../conponent/LoginForm'
import RegisterForm from '../conponent/RegisterForm'

export default class LoginPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoginPage : true
        }
    }

    render(){
        /*let frm;
        if(this.state.isLoginPage){
            return (
            <div className="login-page">
                <LoginForm handleClickSignUp={(e)=> this.state.isLoginPage = false}/>
            </div>
            )
           
        } else {
            return (
            <div className="login-page">
                <RegisterForm handleClickSignIn={(e)=> this.state.isLoginPage = true}/>
            </div>
            )
           
        }*/
        return (
            <div className="login-page">
                {this.state.isLoginPage ? <LoginForm handleClickSignUp={(e)=> this.setState({isLoginPage : false})}/> : <RegisterForm handleClickSignIn={(e)=> this.setState({isLoginPage : true})}/>}
            </div>
        )
    }
}