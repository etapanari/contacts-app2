import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

const ContactRow = (props) => {
    return (
        <tr className="contact-row">
            <td className="contact-cell">{props.item.attributes.first_name}</td>
            <td className="contact-cell">{props.item.attributes.last_name}</td>
            <td className="contact-cell">{props.item.attributes.email}</td>
            <td className="contact-cell">{props.item.attributes.phone_number}</td>
            <td className="contact-cell">{props.item.attributes.timestamp}</td>
        </tr>
    )
}

export default ContactRow