import React from 'react';
import 'react-select/dist/react-select.css';
import Select from 'react-select';
const BookService = require('../../services/Book.service');

export default class AddBookDialog extends React.Component {

    constructor(props){
        super(props);
        this.authors = [];
        this.state = {
            isAuthorLoaded : false,
            authorSelect : {}
        }
        this.loadAuthor = this.loadAuthor.bind(this);
        this.logChange = this.logChange.bind(this);
        this.getBook = this.getBook.bind(this);
    }

    logChange(val) {
        this.setState({
            authorSelect : val
        })
    }

    loadAuthor(input, callback){
        BookService.getAuthors((err, authors) => {
            if(err){
                callback(null, {
                    options : [],
                    complete: true
                });
            } else {
                let options = [];
                authors.forEach((element) => {
                    options.push({
                        value : element.id,
                        label : element.name
                    })
                })  
                callback(null, {
                    options : options,
                    complete: true
                })
            }
        })
    }

    getBook(){
        return {
            name : this.inpName.value,
            price : this.inpPrice.value,
            authors : this.state.authorSelect.value
        }
    }

    render() {
        // Render nothing if the "show" prop is false
        if(!this.props.show) {
            return null;
        }
        
        // The gray background
        const backdropStyle = {
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            padding: 50
        };

        const bottomStyle = {
            'position': 'absolute'
        };

        // The modal "window"
        const modalStyle = {
            'vertical-align': 'middle',
            backgroundColor: '#fff',
            borderRadius: 5,
            maxWidth: 500,
            minHeight: 300,
            margin: '0 auto',
            padding: 30
        };

        return (
            <div className="backdrop" style={backdropStyle}>
                <div className="modal" style={modalStyle}>
                    <input ref={(ref) => this.inpName = ref} placeholder="Name"/>
                    <input ref={(ref) => this.inpPrice = ref} placeholder="Price"/>
                    <Select.Async
                        name="form-field-name"
                        value={this.state.authorSelect ? this.state.authorSelect.value : "Loading"}
                        loadOptions={this.loadAuthor}
                        onChange={this.logChange}
                    />
                    <div className="footer" style={bottomStyle}>
                        <button onClick={(e)=>{
                                this.props.onDone(this.getBook());
                            }}>
                            Add
                        </button>
                        <button onClick={this.props.onCancel}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
