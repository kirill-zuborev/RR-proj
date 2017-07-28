export type NotesData = {
    id: number,
    name: string,
    description: string,
    creationDate: Date
}

export type NotesFilter = {
    nameFilter: string,
    onlyWithComments: boolean,
    dateRange: DateRange,
    pager: Pager
}

export type Pager = {
    page: number,
    count: number
}

export type DateRange = {
    minDate: Date,
    maxDate: Date
}