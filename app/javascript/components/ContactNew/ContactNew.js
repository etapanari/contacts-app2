import React, { useState, setContact } from "react";
import { useHistory } from "react-router";
import axios from "axios";

const ContactNew = () => {

    //setting a contact obj in the state
    const [contact, setContact] = useState({})
    const history = useHistory();

    const handleChange = (e) => {
        e.preventDefault()
        // Constructing the contact json object for the POST method and storing it as contact in State
        setContact(Object.assign({}, contact, {[e.target.name]: e.target.value}))
        console.log('contact:', contact)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        
        const csrfToken = document.querySelector('[name=csrf-token]').content
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
        axios.post('/api/v1/contacts', {contact})
        .then(resp => {
            console.log(resp)
            // Redirect to page
            history.push('/contacts/' + resp.data.data.id)
        })
        .catch(error => {
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

    const handleCancel = (e) => {
        history.push('/')
    }

    return(
        <div>
            <div className="header">
                <h1>Create New Contact</h1>
            </div>
            
            <div>
                <form onSubmit={handleSubmit}>
                    <div>  
                        <input className="field" onChange={handleChange} type="text"  name="first_name" placeholder="First Name"/>
                    </div>
                    <div>  
                        <input className="field" onChange={handleChange} type="text" name="last_name" placeholder="Last Name"/>
                    </div>
                    <div>  
                        <input className="field" onChange={handleChange} type="text" name="email" placeholder="Email"/>
                    </div>
                    <div>  
                        <input className="field" onChange={handleChange} type="text" name="phone_number" placeholder="Phone Number"/>
                    </div>
                    <br/>
                    <button className="button" type="submit">Save</button>
                    <button className="button" onClick={handleCancel} type="submit">Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default ContactNew