import * as models from '../Api/models';

export interface ApplicationState {
    notes: NotesState
}

export interface NotesState {
    notes: models.NotesData[],
    filter: models.NotesFilter
    isLoading: boolean,
}

export interface IdAndName {
    id: number,
    name: string
}