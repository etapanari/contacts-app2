import React, { useState, useEffect, setContact } from "react";
import { useHistory } from "react-router";
import axios from "axios";

const ContactEdit = (props) => {
    const history = useHistory();
    const [contact, setContact] = useState({});
    // const [newContact, setNewContact] = useState({});
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const id = props.match.params.id
        const url = `/api/v1/contacts/${id}`
        axios.get(url)
        .then( resp => {
            console.log(resp)
            // update contact in our state
            setContact(resp.data.data.attributes)
            setLoaded(true)
        })
        .catch( error => console.log(error) )
    }, []) // whenever the contact changes the use Effect will be recalled to render the updated data in the screen
   

    const handleChange = (e) => {
        e.preventDefault()
        // Constructing the new contact json object details for the PATCH method and 
        // storing it as newContact in State
        setContact(Object.assign({}, contact, {[e.target.name]: e.target.value}))
        console.log('contact:', contact)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const csrfToken = document.querySelector('[name=csrf-token]').content
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
        axios.patch('/api/v1/contacts/' + props.match.params.id, {contact})
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

    return(
        <div>
            <h1 className="header">
                Create New Contact
            </h1>
            {/* div will not be rendered until data is loaded in state */}        
            {loaded &&
                <div>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div>  
                            <input className="field" value={contact.first_name} onChange={(e) => handleChange(e)} type="text"  name="first_name" placeholder="First Name"/>
                        </div>
                        <div>  
                            <input className="field" value={contact.last_name} onChange={(e) => handleChange(e)} type="text" name="last_name" placeholder="Last Name"/>
                        </div>
                        <div>  
                            <input className="field" value={contact.email} onChange={(e) => handleChange(e)} type="text" name="email" placeholder="Email"/>
                        </div>
                        <div>  
                            <input className="field" value={contact.phone_number} onChange={(e) => handleChange(e)} type="text" name="phone_number" placeholder="Phone Number"/>
                        </div>
                        <br/>
                        <button className="button" type="submit">Save</button>
                    </form>
                </div>
            }
        </div>
    )
}

export default ContactEdit