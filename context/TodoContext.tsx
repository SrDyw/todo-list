"use client";

import { ITodo, TodoContextType } from "@/types/core/type";
import React, { useState } from "react";

export const TodoContext = React.createContext<TodoContextType | null>(null);

const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<ITodo[]>([
    // {
    //   id: "hola",
    //   deleted: false,
    //   title: "titl1",
    // },
    // {
    //   id: "hol2",
    //   deleted: false,
    //   title: "titl2",
    // },
    // {
    //   id: "hol3",
    //   deleted: false,
    //   title: "titl3",
    // },
  ]);

  const getActiveTodos = (): ITodo[] => todos.filter((x) => x.deleted == false);

  const saveTodos = (todo: ITodo) => {
    setTodos([...todos, todo]);
  };

  const deleteTodo = (id: string) => {
    let todo = todos.find((x) => x.id === id);
    if (todo != undefined) {
      todo.deleted = true;
    }
    // setTodos(todos.filter(x => x.id != id));
  };

  return (
    <TodoContext.Provider
      value={{ saveTodos, todos, deleteTodo, getActiveTodos }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
