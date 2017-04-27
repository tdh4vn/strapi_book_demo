import React from 'react';
import ReactDOM from 'react-dom';
import BookTable from '../conponent/BookTable'

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
            <BookTable style={{background : 'rgb(246, 239, 241)'}}/>
        )
    }
}