import React from "react"
import LoginForm from '../conponent/LoginForm'

export default class LoginPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoginPage : true
        }
    }

    render(){
        let frm;
        if(this.state.isLoginPage){
            frm = <LoginForm />
        } else {
            
        }
        return (
            <div className="login-page">
                {frm}
            </div>
        )
    }
}