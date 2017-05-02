import React from 'react';
import ReactDOM from 'react-dom';
import BookTable from '../conponent/BookTable'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class BookManagementPage extends React.Component {
    constructor(props){
        super(props);
        this.products = [{
            id: 1,
            name: "Product1",
            price: 120
        }, {
            id: 2,
            name: "Product2",
            price: 80
        }];
    }

    render(){
        return (
            <MuiThemeProvider>
                <BookTable style={{background : 'rgb(246, 239, 241)'}}/>
            </MuiThemeProvider>
        )
    }
}