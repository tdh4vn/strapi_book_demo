import React, { Component } from 'react';
import LoginPage from './page/Login.page';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import BookManagementPage from './page/BookManagement.page'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';


import './App.css';

class App extends Component {

  static propTypes = {
      user : PropTypes.object
  }

  static defaultProps = {
      user : {
        token : null,
        username : null,
        email : null,
        isAuthenticated : false,
        isAuthenticating : false,
        isRegisting : false,
        isRegistered : false,
        statusText : null
    }
  }

  componentDidMount(){
    const {dispatch, user, books} = this.props;
  }
 
  componentWillReceiveProps(nextProps){
    if(this.props.user.isAuthenticated !== nextProps.user.isAuthenticated){
      const {dispatch, user, book} =  nextProps;
    }
  }

  constructor(props){
    super(props);
    this.onLoginListener = this.onLoginListener.bind(this);
    this.state = {
      page : 1
    }
    injectTapEventPlugin();
  }

  onLoginListener(result){
    if(result){
      this.setState({
        page : 2
      })
    }
  }

  render() {
    const {user, books} = this.props;
    return (
      <MuiThemeProvider>
        {
          !user.isAuthenticated ? 
            <LoginPage dispatch={this.props.dispatch} user={user} onLoginListener={this.onLoginListener}/> 
            : <BookManagementPage dispatch={this.props.dispatch} books={books}/>
        }
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    user : state.user,
    books : state.books
  }
}

export default connect(mapStateToProps)(App);
