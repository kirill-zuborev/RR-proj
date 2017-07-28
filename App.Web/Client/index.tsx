import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import { Provider } from 'react-redux';
import { Store, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import * as Router from './Routes';
import * as StoreModels from './Store/ApplicationStore';
import configuredStore from './Store/ConfigureStore'

let history = createBrowserHistory();

let reducer = (state, action) => state;

let defaultStore = {
    notes: {
        notes: [],
        isLoading: false,
    }
} as StoreModels.ApplicationState;

let store = configuredStore(defaultStore, history);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history} children={Router.routes} />
    </Provider>,
    document.getElementById("app")
);

