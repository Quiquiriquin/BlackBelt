import React, {Component} from 'react';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';

const CREATE_USER = gql`
        mutation Signup($name:String!,$email:String!,$lastname:String!,$password:String!,$birth_date:String!){
            signup(
            name:$name
            email:$email
            lastname:$lastname
            password:$password
            birth_date:$birth_date
            ){
            user{
                id
                email
            }
            token
            }
        }
`

class Signup extends Component {

    constructor(props){
        super(props);
        this.state = {
            name:'',
            email:'',
            lastname:'',
            password:'',
            birth_date:''
        }
    }

    onInputChange = (event) => {
        let {id,value} = event.target
        this.setState({
            [id]:value
        });
    }

    onFormSubmit = (event,signup) => {
        event.preventDefault();
        console.log('Ya le puche al boton');
        console.log(this.state);
        signup({
            variables:{
                name:this.state.name,
                email:this.state.email,
                lastname:this.state.lastname,
                password:this.state.password,
                birth_date:this.state.birth_date
            }
        }).then( response => {
            console.log(response);
            this.props.history.push('/login');
            //alert('todo chido')

        })
        .catch( err => {
            console.log(err);
            console.log('nostachido');
        })
    }

    render(){
        return(
            <Mutation mutation={CREATE_USER}>
                {(signup,{data})=>(
                    <div>
                    <form onSubmit={(e) => this.onFormSubmit(e,signup)}>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email"
                            id="email"
                            onChange={this.onInputChange}
                            value={this.state.email}
                        />
                    </div>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" placeholder="Enter a name"
                            id="name"
                            onChange={this.onInputChange}
                            value={this.state.name}
                        />
                    </div>
                    <div className="form-group">
                        <label>Last name</label>
                        <input type="text" className="form-control" placeholder="Enter a lastname"
                            id="lastname"
                            onChange={this.onInputChange}
                            value={this.state.lastname}
                        />
                    </div>
                    <div className="form-group">
                        <label>Birth date</label>
                        <input type="text" className="form-control" placeholder="Enter a birth date"
                            id="birth_date"
                            onChange={this.onInputChange}
                            value={this.state.birth_date}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password"
                            id="password"
                            onChange={this.onInputChange}
                            value={this.state.password}
                        />
                    </div>
                    <button type="submit" className="btn btn-success">Registrarme</button>
                    </form>
                </div>
                )}
            </Mutation>
            
        )
    }
}

export default Signup;