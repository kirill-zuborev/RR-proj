import { combineReducers } from 'redux';
import { notesReducer } from './NotesReducer';
import { ApplicationState, NotesState, IdAndName } from '../Store/ApplicationStore';
import { History } from 'history';
import { routerReducer } from 'react-router-redux';

export const reducers = (initialState: ApplicationState, history: History) => {
    const notes = notesReducer(initialState.notes);
    const router = routerReducer;

    return combineReducers<ApplicationState>({
        notes,
        router
    });
}