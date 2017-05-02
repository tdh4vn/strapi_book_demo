import React from "react"
import LoginForm from '../conponent/LoginForm'
import RegisterForm from '../conponent/RegisterForm'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class LoginPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoginPage : true
        }
        this.onLoginListener = this.onLoginListener.bind(this);
    }
    
    onLoginListener(result) {
        console.log(result)
        if(result && this.props.onLoginListener){
            this.props.onLoginListener(result);
        }
    }

    render(){
        return (
            <div className="login-page">
                {this.state.isLoginPage ? <LoginForm onLoginListener={this.onLoginListener} handleClickSignUp={(e)=> this.setState({isLoginPage : false})}/> : <RegisterForm onLoginListener={this.onLoginListener} handleClickSignIn={(e)=> this.setState({isLoginPage : true})}/>}
            </div>
        )
    }
}