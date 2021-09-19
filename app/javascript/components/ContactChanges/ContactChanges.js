import React, { useState, setContacts, useEffect, Fragment } from "react";
import axios from 'axios'
import ContactRow from './ContactRow'
import { Link } from "react-router-dom"


const ContactChanges = (props) => {

    //setting a contacts obj in the state
    const [contactChanges, setContactChanges] = useState([])

    useEffect(() => {
        const id = props.match.params.id
        //get all changes from the API
        axios.get('/api/v1/contacts/' + id + '/changes')
        .then( resp => {
            console.log(resp)
            // update contactchanges in our state
            setContactChanges(resp.data.data)
        })
        .catch( resp => console.log(resp) )
    }, [contactChanges.length]) // whenever the contactChanges length changes the use Effect will be recalled to render the updated data in the screen

    const table_body = contactChanges.map( item => {
        return (
            <ContactRow
                key={item.id}
                item={item}
            />
        )
    })

    return (
        <div>
            <div className="header">
                <h1>History of Contact Edits</h1>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email</th>
                        <th>Phone number</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {table_body}
                </tbody>
            </table>

            <br/>
            <Link className="button" to={"/contacts/new"}>Create New</Link>
        </div>
    )
}

export default ContactChanges