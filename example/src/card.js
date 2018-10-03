import React, { Component } from 'react';
import axios from 'axios';

class Card extends Component {
    constructor(props){
        super(props);
        this.state = {
            nombre : "Enrique",
            personaje:"" 
        }
    }

    componentDidMount(){
        axios.get('https://swapi.co/api/people/4/')
            .then(response => {console.log(response.data.name)
                this.setState({
                    personaje:response.data.name
                })
            })
            .catch( error => console.log(error))
    }

    render() { 
        return ( 
            <div>
                Este es el componente card y en el estado esta:
                {this.state.nombre}
                <br/>
                {this.state.personaje}
            </div>
         );
    }
}
 
export default Card;