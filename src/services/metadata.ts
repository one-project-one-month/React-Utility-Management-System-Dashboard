export interface Meta {
    total: number
    currentPage: number
    lastPage: number
    perPage: number
}

export interface Links {
    next?: string | null
    prev?: string | null
}