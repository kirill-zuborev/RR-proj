import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

type NoteProps =
    { data: string };   

export class Note extends React.Component<NoteProps, {}> {
    public render() {
        return <div>{this.props.data}</div>;
    }
}

