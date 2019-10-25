import React from 'react';
import { shape } from 'prop-types';
import {
    Route,
    Switch
} from 'react-router-dom';

import MainContent from '../components/index';
import AddUser from '../components/AddUser';
import EditUser from '../components/EditUser';

import ErrorPage from '../components/ErrorPage';

const ClientRoutes = ({ location }) => {

    return (
        <Switch>
        	<Route
                location={location}
                path='/add'
                exact
                component={AddUser}
            />
            <Route
                location={location}
                path='/edit/:userId'
                exact
                component={EditUser}
            />
            <Route
                location={location}
                path='/'
                exact
                render={props => { return <MainContent loc='main' {...props} />; }}
            />
            <Route render={() => <ErrorPage />} />
        </Switch>
    );
};

ClientRoutes.propTypes = { location: shape() };

export default ClientRoutes;
