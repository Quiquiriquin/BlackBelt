import React, { Component } from 'react';
import './Navbar.css';
import {Link} from 'react-router-dom';

class Navbar extends Component {

    render() { 
        return ( 
            <nav className="navbar navbar-dark bg-dark">
               <Link to="/me">
                    <h4 className="Navbar_name">Hola{this.props.name}</h4>
               </Link> 
            </nav>
         );
    }
}
 
export default Navbar;