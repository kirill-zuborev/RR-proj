import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';
import { NotesState, IdAndName } from '../Store/ApplicationStore';
import { NotesApi } from '../api/NotesApi';
import { push } from 'react-router-redux';
import * as models from '../Api/models';

export const GET_NOTES_REQUEST = 'GET_NOTES_REQUEST';
export const GET_NOTES_SUCCESS = 'GET_NOTES_SUCCESS';
export const GET_NOTES_ERROR = 'GET_NOTES_ERROR';

const getNotesRequest = createAction(GET_NOTES_REQUEST, (filter: models.NotesFilter) => filter);
const getNotesSuccess = createAction(GET_NOTES_SUCCESS, (response: models.NotesData, filter: models.NotesFilter) => ({ response, filter }));
const getNotesError = createAction(GET_NOTES_ERROR, (e: Error) => ({ e }));

const getNotes = (filter: models.NotesFilter) => (dispatch: Dispatch<NotesState>, getState) => {
    if (filter !== getState().notes.filter) {
        dispatch(getNotesRequest(filter));

        NotesApi.getNotes(filter)
            .then((response: models.NotesData) => dispatch(getNotesSuccess(response, filter)))
            .catch((e: Error) => dispatch(getNotesError(e)));
    }
};

export const notesAction = {
    getNotes: getNotes
};