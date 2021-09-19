import React, { useState, setContacts, useEffect, Fragment } from "react";
import axios from 'axios'


const Contact = (props) => {
    const [contact, setContact] = useState({})
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const id = props.match.params.id
        const url = `/api/v1/contacts/${id}`
        axios.get(url)
        .then( resp => {
            console.log(resp)
            // update contact in our state
            setContact(resp.data)
            setLoaded(true)
        })
        .catch( resp => console.log(resp) )
    }, []) // whenever the contact changes the use Effect will be recalled to render the updated data in the screen

    return (

        <div>
            <div className="header">
                <h1>Contact</h1>                
            </div>
            { loaded &&
                <div>
                    <p><strong>First name: </strong>{contact.data.attributes.first_name}</p>
                    <p><strong>Last name: </strong>{contact.data.attributes.last_name}</p>
                    <p><strong>Email: </strong>{contact.data.attributes.email}</p>
                    <p><strong>Phone number: </strong>{contact.data.attributes.phone_number}</p>

                    <p>
                        Edit
                        Delete 
                        Return to Contacts  
                        History of edits  
                    </p>
                </div>
            }
        </div>
    )
}

export default Contact