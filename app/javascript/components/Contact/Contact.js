import React, { useState, setContacts, useEffect, Fragment } from "react";
import axios from 'axios'
import { Link } from "react-router-dom"
import { useHistory } from "react-router";


const Contact = (props) => {
    const history = useHistory();
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
        .catch( error => console.log(error) )
    }, []) // useEffect will only load once due to empty array []
    
    const handleDelete = (contactId) => {       
        const csrfToken = document.querySelector('[name=csrf-token]').content
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
        axios.delete('/api/v1/contacts/' + contactId)
        .then(resp => {
            console.log(resp)
            // Redirect to page
            history.push('/')
        })
        .catch(error => {
            console.log(error)
            var errorsString = ""
            // iterating error response: https://stackoverflow.com/a/54603766/11158950
            // building an error string to be shown as alert
            for (const key of Object.keys(error.response.data.error)) {
                console.log(key, error.response.data.error[key]);
                errorsString = errorsString + "\n" + key + ": " + error.response.data.error[key] + "\n" 
            }
            alert(errorsString)
        })
    }    

    return (

        <div>
            <div className="header">
                <h1>Contact</h1>                
            </div>
            {/* div will not be rendered until data is loaded in state */}
            { loaded &&
                <div>
                    <p><strong>First name: </strong>{contact.data.attributes.first_name}</p>
                    <p><strong>Last name: </strong>{contact.data.attributes.last_name}</p>
                    <p><strong>Email: </strong>{contact.data.attributes.email}</p>
                    <p><strong>Phone number: </strong>{contact.data.attributes.phone_number}</p>

                    <div className="bottomLinks">
                        <Link className="button" to={"/contacts/" + contact.data.id + "/edit"}>Edit</Link>
                        <a className="button" onClick={ () => handleDelete(contact.data.id) }>Delete</a>
                        <Link className="button" to={"/"}>Return to Contacts</Link>
                        <Link className="button" to={"/contacts/" + contact.data.id + "/changes"}>Changes History</Link>  
                    </div>
                </div>
            }
        </div>
    )
}

export default Contact