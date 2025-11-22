"use client";

import { appConfig } from "@/app.config";
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
  const { set, getAll } = useStorage<IAppData>({
    key: `main-${appConfig.version}`,
  });

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
    let s = session;
    if (s == null) {
      s = createBaseSession();
    }
    
    s!.date = Date.now();
    setTodos([...todos, todo]);
    setSession((prev) => s && { ...s });
  };

  useEffect(() => {
    if (firstRender) return;

    if (session == null) {
      return;
    }

    // Esto es bastante hardcode, pero funciona (basicamente quita la sesion vieja de la data para volver a ponerla pero actualizada xd)
    session.todos = todos;
    data!.sesions = data!.sesions.filter((x) => x.id != session.id);
    data!.sesions = [...data!.sesions, session];

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
    appData.sesions = appData.sesions.filter((x) => !x.deleted);
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
      setSession(undefined);
      setTodos([]);
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
    console.log(data);
    set(data);
  };

  const deleteSession = (id: string, beforeRedirect?: () => void) => {
    if (data == undefined) return;

    var targetSession = data.sesions.find((x) => x.id == id);
    if (targetSession != null) targetSession.deleted = true;

    updateTodoStorage();
    // refreshLinks();

    if (session?.id == targetSession?.id) {
      setTimeout(() => {
        // setNavIsOpen(false);
        // Al borrar la sesion actual y voler a crear un todo todo se va a la mierda
        beforeRedirect?.();
        setTodos([]);
        setSession(undefined);
        redirect("/");
      }, 280);
    }
  };

  const resumeOrStartTodo = (todo: ITodo) => {
    resumeOrStartTodoProcess(todo);
    updateTodoStorage();
  };

  const stopTodo = (todo: ITodo) => {
    stopTodoProcess(todo);
    updateTodoStorage();
  };

  function createBaseSession() {
    const templateSession = BaseSessionData();
    templateSession.todos = todos;

    console.log(templateSession);

    setSession(templateSession);
    data!.sesions = [...(data?.sesions ?? []), templateSession];
    return templateSession;
  }

  const editSession = (id: string, values: ISession) => {
    if (data == null) {
      console.warn("Data is null");
      return;
    }
    var session = data.sesions.find((x) => x.id == id);
    if (session == null) {
      return;
    }

    session.title = values.title;
    setSession((prev) => session && { ...session });
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
        deleteSession,
        editSession,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
