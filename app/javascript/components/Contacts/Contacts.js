import React, { useState, setContacts, useEffect, Fragment } from "react";
import axios from 'axios'
import ContactRow from './ContactRow'

const Contacts = () => {
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        //get all contacts from the API
        axios.get('/api/v1/contacts')
        .then( resp => {
            console.log(resp)
            // update contacts in our state
            setContacts(resp.data.data)
        })
        .catch( resp => console.log(resp) )
    }, [contacts.length]) // whenever the contact length changes the use Effect will be recalled to render the updated data in the screen

    const table_body = contacts.map( item => {
        return (
            <ContactRow
                key={item.id}
                item={item}
            />
        )
    })

    return (
        <div className="home">
            <div className="homeHeader">
                <h1>Contacts</h1>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email</th>
                        <th>Phone number</th>
                        <th colSpan="4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {table_body}
                </tbody>
            </table>
        </div>
    )
}

export default Contacts