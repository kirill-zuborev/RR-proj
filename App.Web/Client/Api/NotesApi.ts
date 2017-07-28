import * as models from './models';

class NotesService {
    getNotes(filter: models.NotesFilter): Promise<models.NotesData> {
        return fetch(`http://${window.location.host}/api/notes/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
            },
            body: JSON.stringify(filter)
		})
            .then<models.NotesData>(response => response.json());
	}
}

export const NotesApi = new NotesService();