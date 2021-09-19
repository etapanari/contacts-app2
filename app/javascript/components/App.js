import React from 'react'
import {Route,Switch} from 'react-router-dom'
import Contacts from './Contacts/Contacts'
import Contact from './Contact/Contact'


const App = () => {
    return (
        <Switch>
            <Route exact path="/" component={Contacts} />
            <Route exact path="/contacts/:id" component={Contact} />
        </Switch>
    )
}

export default App