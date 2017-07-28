import { Action, handleActions, ReducerMap } from 'redux-actions';
import { GET_NOTES_ERROR, GET_NOTES_REQUEST, GET_NOTES_SUCCESS } from '../Actions/NotesAction'
import { NotesState, IdAndName } from '../Store/ApplicationStore';
import * as models from '../Api/models';

export const notesReducer = (initialState: NotesState) => {
    const reducerMap: ReducerMap<NotesState, IdAndName> = {
        [GET_NOTES_REQUEST]: (state: NotesState, action: Action<models.NotesFilter>): NotesState => {
            return Object.assign({}, state, {
                isLoading: true,
                filter: action.payload
            } as NotesState);
        },
        [GET_NOTES_ERROR]: (state: NotesState, action: Action<Error>): NotesState => {
            return Object.assign({}, state, {
                isLoading: false
            } as NotesState);
        },
        [GET_NOTES_SUCCESS]: (state: NotesState, action: Action<{ response: IdAndName[], filter: models.NotesFilter }>): NotesState => {
            return Object.assign({}, state, {
                isLoading: false,
                notes: action.payload.response,
                filter: action.payload.filter
            } as NotesState);
        }
    }

    return handleActions<NotesState, IdAndName>(reducerMap, initialState);
}


