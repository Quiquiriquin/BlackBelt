import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';

class Paypal extends Component {

    constructor(props){
        super(props)
        this.state = {
            showButton:false
        }

        window.ReactDOM = ReactDOM;
        window.React = React;
    }

    componentDidMount(){

    }

    componentWillReceiveProps(nextProps){

    }



    render() { 
        return (  );
    }
}
 
export default scriptLoader("https://www.paypalobjects.com/api/checkout.js")(Paypal);