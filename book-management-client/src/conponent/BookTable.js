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


const BookService = require('../services/Book.service');



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
            isOpenEditBook : false
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
        this.setState({
            isOpenAddBook : true
        })
    }

    onDoneAddBook(book){
        console.log(book);
        this.setState({
            isOpenAddBook : false
        })
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
            <div>
                <Container style={{'margin-bottom' : '10px'}}>
                    <Button color="primary" style={{'margin-right':' 10px'}} onClick={this.addBookClicked}>Add Book</Button>
                    <Button color="primary" style={{'margin-right':' 10px'}}>Edit Book</Button>
                    <Button color="primary" style={{'margin-right':' 10px'}}>Delete Book</Button>
                </Container>
                
                <MuiThemeProvider>
                    {this.state.hasData ? <MuiDataTable config={config}/> : null}
                </MuiThemeProvider>
                <AddBookDialog 
                    show={this.state.isOpenAddBook}
                    onDone={this.onDoneAddBook}
                    onCancel={this.onCancelAddBook}>
                    Here's some content for the modal
                </AddBookDialog>
            </div>
        )
    }
}