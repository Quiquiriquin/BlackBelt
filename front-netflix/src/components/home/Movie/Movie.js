import React, {Component} from 'react'
import './movie.css'
import {Link} from 'react-router-dom'

class Movie extends Component{
    render(){
        return (
            <div className="col-md d-flex align-items-stretch mt-5">
                <div className="card Movie__card">
                    <img className="card-img-top" src={this.props.poster} alt="Card image cap"/>
                    <div className="card-body">
                        <h5 className="card-title">{this.props.title}</h5>
                        <Link to={`/movie/${this.props.id}`}>VER</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Movie;
