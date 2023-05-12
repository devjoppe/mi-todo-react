export interface todoItem {
    id?: number | string,
    body?: string,
    state?: boolean
}

export interface apiTodos {
    id?: number | string,
    todo?: string,
    completed?: boolean,
    userId?: number | string
}