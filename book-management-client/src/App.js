import React, { Component } from 'react';
import LoginPage from './page/Login.page';
import BookManagementPage from './page/BookManagement.page'
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.onLoginListener = this.onLoginListener.bind(this);
    this.state = {
      page : 2
    }
  }

  onLoginListener(result){
    if(result){
      this.setState({
        page : 2
      })
    }
  }

  render() {
    var content;
    switch (this.state){
        case 1:
          content = <LoginPage onLoginListener={this.onLoginListener}/>;
          break;
        case 2:
          content = <BookManagementPage />;
          break;
    }
    return (
        this.state.page === 1 ? <LoginPage onLoginListener={this.onLoginListener}/> : <BookManagementPage />
    );
  }
}

export default App;
