import * as React from 'react';
import { Navigation } from './Navigation';

export class App extends React.Component<{}, {}>
{
    render() {
        return <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-3'>
                    <Navigation />
                </div>
                <div className='col-sm-9'>
                    {this.props.children}
                </div>
            </div>
        </div>;
    }
}