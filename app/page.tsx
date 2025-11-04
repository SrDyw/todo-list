"use client";

import { useStorage } from "@/hooks/useStorage";
import { useTask } from "@/hooks/useTask";
import { ITask, ITaskSet } from "@/types/task";
import React, {
  FormEvent,
  FormEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import IcSend from "@/components/icons/IcSend";
import IcClose from "@/components/icons/IcClose";
import Button from "@/components/ui/Button";
import { TodoContext } from "@/context/TodoContext";
import {
  ITodo,
  TodoContextType,
  TodoModalContextType,
} from "@/types/core/type";
import { TodoItem } from "@/components/TodoItem";
import { TodoModalContext } from "@/context/TodoModalContext";

export default function page() {
  const { getTask } = useTask();
  const { todos, saveTodos, deleteTodo, getTodos } = useContext(
    TodoContext
  ) as TodoContextType;

  const { onOpen } = useContext(
    TodoModalContext
  ) as TodoModalContextType;
  const listRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [titleInput, setTitleInput] = useState<string>("");
  useEffect(() => {
    listRef.current!.style.maxHeight = listRef.current?.scrollHeight + "px";

    updateContainerState();
  }, [todos]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData: FormData = new FormData(event.currentTarget);

    const title = formData.get("task-title")!.toString();

    if (title == "") return;

    saveTodos({
      id: Math.random().toString(),
      title,
      deleted: false,
      isActive: false,
      seconds: 0
    });

    updateContainerState();
    setTitleInput("");
  };

  const onDeleteTask = (id: string, element: HTMLElement) => {
    element.className += " task-out-animation";
    setTimeout(() => {
      element.classList.add("hidden");
      deleteTodo(id);
      updateHeight();
      updateContainerState();
    }, 300);
  };

  const updateHeight = () => {
    listRef.current!.style.maxHeight = listRef.current?.scrollHeight + "px";
  };

  const handleTodoClick = (todo: ITodo) => {
    onOpen(todo);
  };

  function updateContainerState() {
    const activeTodos = getTodos();


    if (activeTodos.length >= 1) {
      containerRef.current?.classList.add("justify-between");
      containerRef.current?.classList.remove("justify-center");
    }
    if (activeTodos.length < 1) {
      containerRef.current?.classList.add("justify-center");
      containerRef.current?.classList.remove("justify-between");
    }
  }

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center flex-col">
        <div
          className="w-[80%] min-w-[320px] max-w-[700px] h-[80vh] flex flex-col items-center justify-center"
          ref={containerRef}
        >
          <h1 className="text-5xl font-black uppercase mb-6 text-center leading-8">
            Todo List
            <br />
            <span className="font-bold opacity-30 text-lg">
              What do you want to do?
            </span>
          </h1>
          <ul
            className="w-[90%] flex flex-col mb-8 task-list mx-auto overflow-y-scroll px-3 "
            ref={listRef}
          >
            <div className="mt-2"></div>
            {todos.map((todo) => (
              <TodoItem todo={todo} key={todo.id} onClick={handleTodoClick}>
                <Button
                  OnClick={(e) => {
                    e.stopPropagation()
                    const li = e.currentTarget.parentElement;
                    onDeleteTask(todo.id, li!);
                  }}
                  Icon={<IcClose />}
                  className="hover:bg-white hover:text-black"
                />
              </TodoItem>
            ))}
          </ul>
          <form
            action=""
            className="w-full flex justify-center items-center"
            onSubmit={handleSubmit}
          >
            <div className="bg-[#181818] rounded-3xl border  border-[#282c34] rainbow-outline flex flex-nowrap items-center w-full">
              <input
                name="task-title"
                type="text"
                className="bg-transparent outline-0 pl-4 font-bold text-3xl p-4 w-full placeholder:font-medium placeholder:text-2xl"
                placeholder="Some awsome name!"
                autoComplete="off"
                value={titleInput}
                onChange={(e) => setTitleInput(e.currentTarget.value)}
              />
              <Button Icon={<IcSend />} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
