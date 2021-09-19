import React, { useState, setContacts, useEffect, Fragment } from "react";
import axios from 'axios'

const Contacts = () => {
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        //get all contacts from the API
        // update contacts in our state
        axios.get('/api/v1/contacts')
        .then( resp => {
            setContacts(resp.data.data)
        })
        .catch( resp => console.log(resp) )
    }, [contacts.length]) // whenever the contact length changes the use Effect will be recalled to render the updated data in the screen

    const list = contacts.map( item => {
        return (<li key={item.attributes.first_name}>{item.attributes.first_name}</li>)
    })

    return (
        <Fragment>
            <div>This is the contacts#show view of the app</div>            
            <ul>{list}</ul>
        </Fragment>
    )
}

export default Contacts