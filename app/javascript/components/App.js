import React from 'react'
import {Route,Switch} from 'react-router-dom'
import Contacts from './Contacts/Contacts'
import Contact from './Contact/Contact'
import ContactNew from './ContactNew/ContactNew'
import ContactEdit from './ContactEdit/ContactEdit'
import ContactChanges from './ContactChanges/ContactChanges'

const App = () => {
    return (
        <Switch>
            <Route exact path="/" component={Contacts} />
            <Route exact path="/contacts/new" component={ContactNew} />
            <Route exact path="/contacts/:id" component={Contact} />
            <Route exact path="/contacts/:id/edit" component={ContactEdit} />
            <Route exact path="/contacts/:id/changes" component={ContactChanges} />
        </Switch>
    )
}

export default App