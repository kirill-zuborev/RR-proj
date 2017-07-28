import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import * as NotesActions from '../../Actions/NotesAction'
import { Note } from './Note';
import * as StoreModel from '../../Store/ApplicationStore';
import * as models from '../../Api/models';
import { stringify, parse } from 'query-string';

type NotesProps =
    StoreModel.NotesState
    & typeof NotesActions.notesAction
    & RouteComponentProps<models.NotesFilter>;

type NoteQuerySchema = {
    nameFilter: string,
    onlyWithComments: boolean,
    minDate: Date,
    maxDate: Date,
    page: number,
    count: number
}

class Notes extends React.Component<NotesProps, {}> {
    getFilter(): models.NotesFilter {
        let query = parse(this.props.location.search) as NoteQuerySchema;

        return {
            dateRange: {
                maxDate: query.maxDate,
                minDate: query.minDate
            },
            nameFilter: query.nameFilter,
            onlyWithComments: query.onlyWithComments,
            pager: {
                count: query.count,
                page: query.page
            }
        };
    }





    componentWillMount() {
        let filter = this.props.filter || { pager: { count: 10, page: 0 } } as models.NotesFilter;

        let obj = stringify(filter);


        let qs = parse(obj)


        this.props.getNotes(filter);
    }

    componentWillReceiveProps(nextProps: NotesProps) {
        let filter = nextProps.filter || { pager: { count: 10, page: 0 } } as models.NotesFilter;

        this.props.getNotes(filter);
    }

    public render() {


        return <div>
            {this.props.notes.map(c => <Note data={c.name} key={c.id} />)}
            {this.props.isLoading ? "Loading" : "Loading complete"}
            <button onClick={() => {
                let filter = Object.assign({}, this.props.filter);
                filter.pager.page = filter.pager.page + 1;
                this.props.getNotes(filter);
            }} >Next</button>
            <button onClick={() => {
                let filter = Object.assign({}, this.props.filter);
                filter.pager.page = 0;
                this.props.getNotes(filter);
            }}> Start</button>
            <button onClick={() => {
                let filter = Object.assign({}, this.props.filter);
                filter.pager.page = filter.pager.page - 1;
                this.props.getNotes(filter);
            }}>Prev</button>
        </div>;
    }
}

export default connect(
    (state: StoreModel.ApplicationState) => state.notes,
    NotesActions.notesAction
)(Notes) as typeof Notes;
