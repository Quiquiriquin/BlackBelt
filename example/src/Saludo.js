import React, { Component } from 'react';

class Saludo extends Component {
    constructor(props){
        super(props)
    }

    componentWillMount(){
        console.log("En will mount");
    }

    componentDidMount(){
        console.log("En did mount");
    }

    state = {  }
    render() { 
        console.log("Render");
        return ( 
            <div>
                {this.props.saludin}desde el componte de saludo
            </div>
         );
    }
}
 
export default Saludo;