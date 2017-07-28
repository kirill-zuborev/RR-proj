import * as React from 'react';
import { Route } from 'react-router-dom';
import { App } from './Components/App';
import { Home } from './Components/Home';
import Notes from './Components/Notes/Notes';

export const routes = <App>
    <Route exact path='/' component={Home} />
    <Route path='/notes' component={Notes} />
</App>;