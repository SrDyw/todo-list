import { TodoContext } from "@/context/TodoContext";
import { ITodo, TodoContextType } from "@/types/core/type";
import { useContext, useState } from "react";
import { useStorage } from "./useStorage";

export default function useTodoHandler() {
  const [activeTodo, setActiveTodo] = useState<ITodo | null>(null);
  const [secondsOfActive, setSecondsOfActive] = useState<number>(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>();

  const resumeOrStartTodo = (todo: ITodo) => {
    if (activeTodo != null) {
      if (activeTodo.id == todo.id) {
        pauseTodo(todo);
        return;
      }
      if (
        confirm(
          "There is already an active todo, Do you want to pause it and start current one?"
        ) == false
      ) {
        return;
      }
      //   Si confirma el cambio de tarea entonces actualizan los segundos de la tarea
      activeTodo.isActive = false;
    }
    clearCurrentInterval();
    todo.isActive = true;
    setActiveTodo(todo);
    setSecondsOfActive(todo.seconds);

    const interval: NodeJS.Timeout = setInterval(() => {
      setSecondsOfActive((prev) => prev + 1);
      todo.seconds += 1;
    }, 1000);

    setTimerInterval(interval);
  };
  function clearCurrentInterval() {
    if (timerInterval) clearInterval(timerInterval);
  }

  const pauseTodo = (todo: ITodo) => {
    if (todo.isActive) {
      clearCurrentInterval();
      todo.isActive = false;
      setActiveTodo(null);
      return;
    }
  };

  const stopTodo = (todo: ITodo) => {
    pauseTodo(todo);
    todo.seconds = 0;
    setSecondsOfActive(0);
    setActiveTodo(null);
  }

  return { resumeOrStartTodo, pauseTodo, secondsOfActive, stopTodo };
}
