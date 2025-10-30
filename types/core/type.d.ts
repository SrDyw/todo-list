export interface ITodo {    
    id: string,
    title: string,
    deleted: boolean
}

export type TodoContextType = {
    todos : ITodo[];
    saveTodos: (todo : ITodo) => void;
    deleteTodo: (id: string) => void;
}