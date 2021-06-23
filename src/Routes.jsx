import React from 'react'
import { Route, Redirect } from 'react-router'
import { HashRouter } from 'react-router-dom';

import Titulos from './Components/Titulos';

const Routes = props => (
    <HashRouter>
        <Redirect from='*' to='/titulos' />
        <Route path='/titulos' component={Titulos} />
    </HashRouter>
)

export default Routes