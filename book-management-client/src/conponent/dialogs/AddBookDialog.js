import React from 'react';
import 'react-select/dist/react-select.css';
import Select from 'react-select';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
const BookService = require('../../services/Book.service');


const buttonStyle = {
    'background' : '#4CAF50',
    'margin-right':' 10px'
}

export default class AddBookDialog extends React.Component {

    constructor(props){
        super(props);
        this.authors = [];
        this.state = {
            isAuthorLoaded : false,
            authorSelect : 1,
            authors : [],
            open : false,
        }
        this.bookName = "";
        this.bookPrice = "";
        this.authors = [];
        this.loadAuthor = this.loadAuthor.bind(this);
        this.getBook = this.getBook.bind(this);
        this.showDialog = this.showDialog.bind(this);
        this.dismiss = this.dismiss.bind(this);
        this.loadAuthor();
    }

    showDialog(){
        this.setState({
            open : true
        })
    }

    dismiss(){
        this.setState({
            open : false
        })
    }


    loadAuthor(){
        BookService.getAuthors((err, authors) => {
            console.log(authors);
            if(err){
                this.setState({
                    authors : []
                })
            } else {
                let options = [];
                authors.forEach((element) => {
                    this.authors.push(element);
                    options.push(<MenuItem value={element.id} primaryText={element.name} />)
                })
                this.setState({
                    authors : options
                })
            }
        })
    }

    getBook(){

        let author = {};
        this.authors.forEach((element)=>{
            if(element.id === this.state.authorSelect){
                author = element
            }
        })

        return {
            name : this.bookName,
            price : this.bookPrice,
            authors : author
        }
    }

    addBook = () => {
        BookService.addBook(
            localStorage.getItem("jwt"), this.getBook(), (err, book) => {
                if (err) {
                    
                } else {
                   this.props.onDone(book);
                }
            })
    }

    handleChange = (event, index, author) => {
        console.log(author);
        this.setState({authorSelect : author}) 
    };

    handleClose = (event) => {
        this.setState({open: false});
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onTouchTap={() => {
                    this.addBook();
                    
                    this.handleClose();
                }}
            />,
        ];
        return (
            <Dialog
                title="Add Book"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}>
                    <TextField
                        ref={(ref)=>this.inpName=ref}
                        hintText="Hint Text"
                        floatingLabelText="Name"
                        floatingLabelFixed={true}
                        onChange={(event, str) => {
                            this.bookName = str;
                        }}
                    /><br/>
                    <TextField
                        ref={(ref) => this.inpPrice = ref}
                        hintText="Hint Text"
                        floatingLabelText="Price"
                        floatingLabelFixed={true}
                        onChange={(e, str)=>{
                            this.bookPrice = str;
                        }}
                    /><br />

                    <SelectField
                        floatingLabelText="Author"
                        value={this.state.authorSelect}
                        onChange={this.handleChange}
                    >
                        {this.state.authors}
                    </SelectField>
                    <br />
            </Dialog>
        );
    }
}
