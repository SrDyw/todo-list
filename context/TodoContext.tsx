'use client'

import { ITodo, TodoContextType } from "@/types/core/type";
import React, { useState } from "react";

export const TodoContext = React.createContext<TodoContextType | null>(null);

const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [todos, setTodos] = useState<ITodo[]>([]);

    const saveTodos = (todo: ITodo) => {
        const newTodo: ITodo = {
            ...todo,
            id: crypto.randomUUID()
        }

        setTodos([...todos, newTodo]);
    }

    const deleteTodo = (id: string) => {
        setTodos(todos.filter(x => x.id != id));
    }

    return <TodoContext.Provider value={{ saveTodos, todos, deleteTodo }}>
        {children}
    </TodoContext.Provider>
}

export default TodoProvider;