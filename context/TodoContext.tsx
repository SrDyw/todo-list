"use client";

import { useStorage } from "@/hooks/useStorage";
import useTodoHandler from "@/hooks/useTodoHandler";
import { ITodo, TodoContextType } from "@/types/core/type";
import React, { useEffect, useState } from "react";

export const TodoContext = React.createContext<TodoContextType | null>(null);

const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const { resumeOrStartTodo, secondsOfActive } = useTodoHandler();
  const { set, getAll } = useStorage<ITodo[]>({ key: "main" });

  const getTodos = (): ITodo[] => todos.filter((x) => x.deleted == false);

  const [firstRender, setFirstRender] = useState<boolean>(true);

  const saveTodos = (todo: ITodo) => {
    setTodos([...todos, todo]);
  };

  useEffect(() => {
    const storagedTodos = getAll();
    setTodos(storagedTodos);
    setFirstRender(false);

    const activeTodo = storagedTodos.find((x) => x.isActive);
    if (activeTodo != null) {
      resumeOrStartTodo(activeTodo);
    }
  }, []);

  useEffect(() => {
    if (firstRender) return;
    set(getTodos());
  }, [secondsOfActive]);

  const deleteTodo = (id: string) => {
    let todo = todos.find((x) => x.id === id);
    if (todo != undefined) {
      todo.deleted = true;
    }
    // setTodos(todos.filter(x => x.id != id));
  };

  return (
    <TodoContext.Provider
      value={{ saveTodos, todos, deleteTodo, getTodos, resumeOrStartTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
