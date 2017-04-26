import React from "react"
export default class Button extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        if(this.props.onButtonClick){
            this.props.onButtonClick(e);
        }
    }


    render(){
        return(
            <button onClick = {this.handleClick}>{props.name}</button>
        )
    }
}