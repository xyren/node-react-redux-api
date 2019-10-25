import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/index'
import watchFetchUsersApiSaga from './saga/fetchUsersApi'
import './css/index.css'

import { BrowserRouter } from 'react-router-dom'

import ClientRoutes from './routes';

const loggerMiddleware = createLogger()
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        sagaMiddleware,
        loggerMiddleware ))

sagaMiddleware.run(watchFetchUsersApiSaga)


/**
 * Initiate client routes
 * @param {Object} location 
 */
const Client = ({ location }) => {
    return (
        <Provider store={store}>
            <ClientRoutes location={location} />
        </Provider>
    );
};

/**
 * Configure browser router
 * @param {Object} location 
 */
const App = ({ location }) => {
    return (
        <BrowserRouter>
            <Client />
        </BrowserRouter>
    );
}

ReactDOM.render(
    <Provider store={store}>
        <App  />
    </Provider>, 
    document.getElementById('root')
);
