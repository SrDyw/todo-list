"use client";

import { useStorage } from "@/hooks/useStorage";
import { useTask } from "@/hooks/useTask";
import { ITask, ITaskSet } from "@/types/task";
import React, { FormEvent, FormEventHandler, useContext, useEffect, useRef } from "react";
import IcSend from "@/components/icons/IcSend"
import IcClose from "@/components/icons/IcClose"
import Button from "@/components/ui/Button";
import { TodoContext } from "@/context/TodoContext";
import { TodoContextType } from "@/types/core/type";

export default function page() {
  const { getTask } = useTask();
  const { todos, saveTodos, deleteTodo } = useContext(TodoContext) as TodoContextType
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    listRef.current!.style.maxHeight = listRef.current?.scrollHeight + "px";

    console.log(todos);
  }, [todos]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData: FormData = new FormData(event.currentTarget);

    saveTodos({
      id: crypto.randomUUID(),
      title: formData.get("task-title")!.toString()
    });
  }

  const onDeleteTask = (id: string, element: HTMLElement) => {
    element.className += " task-out-animation";
    console.log(element);
    setTimeout(() => {
      console.log("deleted ", id, element.id);
      // element.classList.add("hidden");
      deleteTodo(id);
      
      updateHeight();
    }, 300)
  }

  const updateHeight = () => {
    listRef.current!.style.maxHeight = listRef.current?.scrollHeight + "px";
  }

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center flex-col">
        <div className="w-[80%] max-w-[600px]">
          <ul className="flex flex-col mb-8 gap-2 task-list" ref={listRef}>
            {
              todos.map((todo, i) => (
                <li key={i} className="bg-[#181818] p-2 pl-4 rounded-3xl fade-in-animation flex justify-between items-center"
                  id={todo.id}>
                  {todo.title}
                  <Button OnClick={(e) => {
                    const li = e.currentTarget.parentElement;
                    onDeleteTask(todo.id, li!)
                  }} Icon={<IcClose />} />
                </li>
              ))
            }
          </ul>
          <form action="" className="w-full flex justify-center items-center" onSubmit={handleSubmit}>
            <div className="bg-[#181818] rounded-3xl  rainbow-outline flex flex-nowrap items-center w-full">
              <input
                name="task-title"
                type="text"
                className="bg-transparent outline-0 border-0 pl-4 font-bold text-3xl p-4 flex-1 placeholder:font-medium placeholder:text-2xl"
                placeholder="Some awsome name!"
                autoComplete="off"
              />
              <Button Icon={<IcSend />} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
