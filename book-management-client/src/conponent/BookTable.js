import React from 'react';
import ReactDOM from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { MuiDataTable } from 'mui-data-table';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';
import AddBookDialog from './dialogs/AddBookDialog';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';



const BookService = require('../services/Book.service');


const buttonStyle = {
    'background' : '#4CAF50',
    'margin-right':' 10px'
}

export default class BookTable extends React.Component {

    constructor(props){
        super(props);
        this.products = {};
        this.getBooks = this.getBooks.bind(this);
        this.addBookClicked = this.addBookClicked.bind(this);
        this.onDoneAddBook = this.onDoneAddBook.bind(this);
        this.onCancelAddBook = this.onCancelAddBook.bind(this);
        this.data = new Object();
        this.state = {
            hasData : true,
            isOpenAddBook : false,
            isOpenEditBook : false,
            value : 1
        }
        this.getBooks();
    }



    getBooks(){
        BookService.getBooks((err, data) => {
            if(!err){
                this.data = data;
                this.setState({
                    hasData : true
                })
            }
        })
    }

    addBookClicked(e){
        this.dialogAddBook.showDialog();
    }

    onDoneAddBook(book){
        console.log(book);
    }

    onCancelAddBook(){
        this.setState({
            isOpenAddBook : false
        })
    }

    render(){
        
        let config = {
            paginated: true,
            data: this.data,
            columns: [
                { property: 'id', title: 'S/N'},
                { property: 'name', title: 'Name' },
                { property: 'price', title: 'Price' },
                { property: 'author', title: 'Author' }
            ]
        };

        return (
            <div >
                <Container style={{'margin-bottom' : '10px'}}>
                    <RaisedButton label="Add Book" style={buttonStyle} primary={true} onClick={this.addBookClicked}/>
                    <RaisedButton label="Edit Book" style={buttonStyle} primary={true}/>
                    <RaisedButton label="Delete Book" style={buttonStyle} primary={true}/> 
                </Container>
                <MuiThemeProvider>
                    {this.state.hasData ? <MuiDataTable config={config}/> : null}
                </MuiThemeProvider>
                <AddBookDialog 
                    ref={(ref) => this.dialogAddBook = ref}
                    onDone={this.onDoneAddBook}
                    onCancel={this.onCancelAddBook}>
                </AddBookDialog>
            </div>
        )
    }
}