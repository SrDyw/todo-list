export interface ITodo {    
    id: string,
    title: string
}

export type TodoContextType = {
    todos : ITodo[];
    saveTodos: (todo : ITodo) => void;
    deleteTodo: (id: string) => void;
}