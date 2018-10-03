import React, { Component } from 'react';
import gql from 'graphql-tag';
import {Mutation, renderToStringWithData} from 'react-apollo';
import FileUploader from 'react-firebase-file-uploader';
import Firebase from '../../Firebase';

const UPDATE_ME = gql`
    mutation updateUser(
        $name: String!,
        $lastname: String!,
        $password: String!,
        $birth_date: String!,
        $gender:Genders,
        $avatar: String!
        ){
            updateUser(
                name: $name,
                lastname : $lastname,
                password: $password,
                birth_date: $birth_date,
                gender: $gender, 
                avatar: $avatar
            ){
                id,
                name,
                avatar,
                gender
            }
        }
`;


class FormMe extends Component {

    constructor(props){
        super(props)
        this.state = {
            ...props.data
        }
    }

    handleInput = (event) => {
        let {name,value} = event.target
        this.setState(
            {[name]:value}
        )
    }

    formSubmit = (e,updateUser) => {
        e.preventDefault();
        console.log(this.state);
        updateUser(
            {variables:{
                ...this.state
            }}
        )

    }

    uploadFile = async(filename) => {
        let url = await Firebase.storage().ref('avatars').child(filename)
            .getDownloadURL()
            this.setState({avatar:url})
    }

    render() { 
        return ( 

            <Mutation mutation={UPDATE_ME}>
                {
                    (updateUser,{data}) => (
            <div className = "row">
                <div className = "col-md-9">
                        <img src={this.state.avatar} className="img-fluid img-rounded" width="150"/>
                    <form onSubmit={(e) => this.formSubmit(e,updateUser)}>
                        <div className="form-group">
                            <label htmlForm="">Nombre:</label>
                            <input className="form-control" type="text" name="name" value={this.state.name} 
                            onChange={this.handleInput}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlForm="">Apellido:</label>
                            <input className="form-control" type="text" name="lastname" value={this.state.lastname} 
                            onChange={this.handleInput}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlForm="">Fecha de nacimiento:</label>
                            <input className="form-control" type="text" name="birth_date" value={this.state.birth_date}
                            onChange={this.handleInput} />
                        </div>
                        <div className="form-group">
                            <label htmlForm="">Genero:</label>
                            <select name="gender" className="form-control" id="" value={this.state.gender}
                            onChange={this.handleInput}>
                                <option value="H">Hombre</option>
                                <option value="M">Mujer</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlForm="">Email:</label>
                            <input className="form-control" type="text" name="email" disabled value={this.state.email}
                            onChange={this.handleInput} />
                        </div>
                        <div className="form-group">
                            <label htmlForm="" className="btn btn-danger">Avatar:
                            <FileUploader
                                hidden
                                accept="image/*"
                                randomizeFilename
                                storageRef={
                                    Firebase.storage().ref('avatars')
                                }
                                onUploadError = {(err) => console.log(err)}
                                onUploadSuccess = {this.uploadFile}
                            >

                            </FileUploader>
                            </label>

                        </div>
                        <button type="submit" className="btn btn-success">Guardar</button>
                    </form>
                </div>
            </div>
                    )
                }
            </Mutation>
         );
    }
}

export default FormMe;