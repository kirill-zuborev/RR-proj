import { createStore, Store, applyMiddleware } from 'redux';
import { ApplicationState } from '../Store/ApplicationStore';
import { reducers } from '../reducers/Reducers';
import thunk from 'redux-thunk';
import { History } from 'history';
import { routerMiddleware } from 'react-router-redux'

const configuredStore = (initialState: ApplicationState, history: History): Store<ApplicationState> => {
    const configuredReducers = reducers(initialState, history);

    const middleware = applyMiddleware(routerMiddleware(history), thunk);

    return createStore(configuredReducers, initialState, middleware);
};

export default configuredStore;
