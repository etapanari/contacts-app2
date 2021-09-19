import React from "react";

const ContactRow = (props) => {
    return (
        <tr className="contact-row">
            <td className="contact-cell">{props.attributes.first_name}</td>
            <td className="contact-cell">{props.attributes.last_name}</td>
            <td className="contact-cell">{props.attributes.email}</td>
            <td className="contact-cell">{props.attributes.phone_number}</td>

            <td className="contact-cell">Show</td>
            <td className="contact-cell">Edit</td>
            <td className="contact-cell">Delete</td>
            <td className="contact-cell">History of edits</td>
        </tr>
    )
}

export default ContactRow