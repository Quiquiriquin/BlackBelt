import React, { Component } from 'react';
import gql from 'graphql-tag';
import {Mutation, Query} from 'react-apollo';
import FileUploader from 'react-firebase-file-uploader';
import Firebase from '../../Firebase';
import FormMe from './FormMe';


const GET_ME = gql `
    query{
        me{
            name,
            lastname,
            email,
            password
            birth_date,
            gender,
            avatar,
            suscription{
                suscription_type
            }
        }
    }
`;

class Me extends Component {

    render() { 
        return ( 
            <div>
                <Query query={GET_ME}>
                    {
                        ({loading,error, data}) => {
                            if(loading) return ( <h4>Loading...</h4> )
                            if(error) return ( <h4>Error</h4> )
                            return <FormMe data={data.me}></FormMe>
                        }
                    }
                </Query>
            </div>
         );
    }
}
 
export default Me;