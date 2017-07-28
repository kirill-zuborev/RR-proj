import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';

export class Navigation extends React.Component<{}, {}> {
    public render() {
        return <ul className='nav navbar-nav'>
            <li>
                <NavLink exact to={'/'} activeClassName='active'>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to={'/notes'} activeClassName='active'>
                    Notes
                </NavLink>
            </li>
        </ul>
    }
}

