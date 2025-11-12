"use client";

import { useStorage } from "@/hooks/useStorage";
import useTodoHandler from "@/hooks/useTodoHandler";
import { BaseAppData, BaseSessionData } from "@/mocks/data.template";
import { IAppData, ISession, ITodo, TodoContextType } from "@/types/core/type";
import { Session } from "inspector/promises";
import { notFound, redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

export const TodoContext = React.createContext<TodoContextType | null>(null);

const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [session, setSession] = useState<ISession>();

  const {
    resumeOrStartTodo: resumeOrStartTodoProcess,
    secondsOfActive,
    stopTodo: stopTodoProcess,
  } = useTodoHandler();
  const { set, getAll } = useStorage<IAppData>({ key: "main" });

  const getTodos = (sesionId: string): ITodo[] => {
    const targetSesion = data?.sesions?.find((x) => x.id == sesionId);
    if (targetSesion) {
      return targetSesion.todos.filter((x) => x.deleted == false);
    }
    return [];
  };

  const [firstRender, setFirstRender] = useState<boolean>(true);
  const [data, setData] = useState<IAppData>();

  const saveTodos = (todo: ITodo) => {
    setTodos([...todos, todo]);
  };

  useEffect(() => {
    if (firstRender) return;
    if (session == null) {
      console.warn("Session is null, created");
      const templateSession = BaseSessionData;
      templateSession.todos = todos;

      setSession(templateSession);
      data!.sesions = [...(data?.sesions ?? []), templateSession];
      updateTodoStorage();

      return;
    }

    // Esto es bastante hardcode, pero funciona (basicamente quita la sesion vieja de la data para volver a ponerla pero actualizada xd)
    session.todos = todos;
    data!.sesions = data!.sesions.filter((x) => x.id != session.id);
    data!.sesions = [...data!.sesions, session];
    console.log(data);
    updateTodoStorage();
  }, [todos]);

  useEffect(() => {
    setupData();
    setFirstRender(false);
  }, []);

  const setupData = () => {
    const appData = getAll();
    // Si no hay ningun dato, cargamos los default
    if (appData == undefined) {
      createTemplateBaseData();
      return;
    }

    setData(appData);
  };

  const createTemplateBaseData = () => {
    setData(BaseAppData);
  };

  const setCurrentSession = (id: string) => {
    const appData = getAll();

    const targetSesion = appData?.sesions?.find((x) => {
      return x.id == id;
    });

    // No hay sesion para esta id
    if (targetSesion == undefined) {
      return;
    }

    setSession(targetSesion);
    setTodos(targetSesion.todos.filter((x) => !x.deleted));

    const activeTodo = targetSesion.todos.find((x) => x.isActive);
    if (activeTodo != null) {
      resumeOrStartTodo(activeTodo);
    }
  };

  useEffect(() => {
    if (firstRender) return;
    updateTodoStorage();
  }, [secondsOfActive]);

  const deleteTodo = (id: string) => {
    let todo = todos.find((x) => x.id === id);
    if (todo != undefined) {
      todo.deleted = true;
    }
    // setTodos(todos.filter(x => x.id != id));
    updateTodoStorage();
  };

  const updateTodoStorage = () => {
    if (data == undefined) {
      console.warn("No data to save, skipped saving process");
      return;
    }
    set(data);
  };

  const resumeOrStartTodo = (todo: ITodo) => {
    resumeOrStartTodoProcess(todo);
    updateTodoStorage();
  };

  const stopTodo = (todo: ITodo) => {
    stopTodoProcess(todo);
    updateTodoStorage();
  };

  return (
    <TodoContext.Provider
      value={{
        saveTodos,
        todos,
        deleteTodo,
        getTodos,
        resumeOrStartTodo,
        stopTodo,
        secondsOfActive,
        updateTodoStorage,
        setCurrentSession,
        session,
        data,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
