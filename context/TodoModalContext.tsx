"use client";

import { TodoItem } from "@/components/TodoItem";
import {
  ITodo,
  TodoModalContextType,
  TodoContextType,
} from "@/types/core/type";
import React, { useContext, useEffect, useRef, useState } from "react";
import { TodoContext } from "./TodoContext";
import { todo } from "node:test";
import { formatTime, getSplitedTime } from "@/lib/libs";

export const TodoModalContext =
  React.createContext<TodoModalContextType | null>(null);

const TodoModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedTodo, setSelectedTodo] = useState<ITodo | null>({
    deleted: false,
    id: "asdasd",
    title: "pan con queso",
  });

  const modalRef = useRef<HTMLDivElement | null>(null);

  const onClose = () => {
    modalRef.current?.classList.remove("move-up-animation");
    setTimeout(() => {
      modalRef.current?.classList.add("move-down-animation");
      setTimeout(() => {
        setSelectedTodo(null);
      }, 280);
    }, 100);
  };

  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        console.log(formatTime(getSplitedTime(prevTime)));
        return prevTime + 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [selectedTodo]);

  return (
    <TodoModalContext.Provider value={{ setSelectedTodo }}>
      {selectedTodo != null && (
        <div
          className="fixed top-0 w-screen h-screen z-50 backdrop-blur-lg"
          onClick={onClose}
        >
          <div className="move-up-animation" ref={modalRef}>
            <div
              className="my-16 text-4xl bg-[#181818] rounded-3xl mx-auto flex justify-between items-center relative mb-4 w-[90%] p-4 max-w-[700px] todo-modal cursor-pointer"
              onClick={onClose}
            >
              <div className="">
                <p className="font-bold">{selectedTodo.title}</p>
              </div>
            </div>
            <div className="w-full justify-center text-center mt-8 ">
              <p className="text-7xl font-black">{time}</p>
            </div>
          </div>
        </div>
      )}
      {children}
    </TodoModalContext.Provider>
  );
};

export default TodoModalProvider;
