import React, { useState } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useHistory } from "react-router";

const ContactRow = (props) => {
    const history = useHistory();
    const [refresh,setRefresh] = useState();

    const handleDelete = (contactId) => {       
        const csrfToken = document.querySelector('[name=csrf-token]').content
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
        axios.delete('/api/v1/contacts/' + contactId)
        .then(resp => {
            console.log(resp)
            // Refresh component by reseting the state
            window.location.reload();
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
        <tr className="contact-row">
            <td className="contact-cell">{props.item.attributes.first_name}</td>
            <td className="contact-cell">{props.item.attributes.last_name}</td>
            <td className="contact-cell">{props.item.attributes.email}</td>
            <td className="contact-cell">{props.item.attributes.phone_number}</td>

            <td className="contact-cell">
                <Link className="button" to={`/contacts/${props.item.id}`}>Show</Link>
            </td>
            <td className="contact-cell">
                <Link className="button" to={`/contacts/${props.item.id}/edit`}>Edit</Link>
            </td>
            <td className="contact-cell">
                <a className="button" onClick={ () => handleDelete(props.item.id) }>Delete</a>
            </td>
            <td className="contact-cell">
                <Link className="button" to={`/contacts/${props.item.id}/changes`}>Changes History</Link>  
            </td>
        </tr>
    )
}

export default ContactRow