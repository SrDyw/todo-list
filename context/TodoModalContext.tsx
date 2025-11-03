"use client";

import { TodoItem } from "@/components/TodoItem";
import {
  ITodo,
  TodoModalContextType,
  TodoContextType,
} from "@/types/core/type";
import React, {
  MouseEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { TodoContext } from "./TodoContext";
import { todo } from "node:test";
import { formatTime, getSplitedTime } from "@/lib/libs";
import IcPause from "@/components/icons/IcPause";
import IcPlay from "@/components/icons/IcPlay";
import IcStop from "@/components/icons/IcStop";
import IcSeettings from "@/components/icons/IcSettings";
import IcRestart from "@/components/icons/IcRestart";
import Button from "@/components/ui/Button";
import { simpleTodo } from "@/mocks/todo.tamplates";
import IcSettings from "@/components/icons/IcSettings";

export const TodoModalContext =
  React.createContext<TodoModalContextType | null>(null);

const TodoModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedTodo, setSelectedTodo] = useState<ITodo>(simpleTodo);
  const { getTodos, resumeOrStartTodo, stopTodo } = useContext(
    TodoContext
  ) as TodoContextType;

  const modalRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const formatedTime = (t: number) => formatTime(getSplitedTime(t));

  const handlePlay = (e: React.MouseEvent) => {
    resumeOrStartTodo(selectedTodo);
  };

  const handleStop = (e: React.MouseEvent) => {
    stopTodo(selectedTodo);
  }

  const onOpen = (todo: ITodo) => {
    setIsOpen(true);
    setSelectedTodo(todo);
  };

  const onClose = () => {
    modalRef.current?.classList.remove("move-up-animation");

    setTimeout(() => {
      modalRef.current?.classList.add("move-down-animation");
      setTimeout(() => {
        setIsOpen(false);
        // setSelectedTodo(null);
      }, 280);
    }, 100);
  };

  return (
    <TodoModalContext.Provider value={{ onOpen }}>
      {isOpen && (
        <div
          className="fixed top-0 w-screen h-screen z-50 backdrop-blur-lg"
          onClick={onClose}
        >
          <div className="move-up-animation" ref={modalRef}>
            <div
              className="my-16 text-4xl bg-[#181818] rounded-3xl mx-auto flex justify-between items-center relative mb-4 w-[90%] p-4 max-w-[700px] todo-modal cursor-pointer"
              onClick={onClose}
            >
              <div className="flex justify-between w-full items-center">
                <p className="font-bold truncate mr-3">{selectedTodo?.title}</p>
                <div className="button-section flex gap-3 items-center justify-center bg-[#00000055] rounded-4xl p-2">
                  <Button
                    Icon={selectedTodo.isActive ? <IcPause /> : <IcPlay />}
                    className="hover:bg-[#ffffff50] transition-all duration-75 mx-0 p-4"
                    OnClick={handlePlay}
                  />
                  <Button
                    Icon={<IcSettings />}
                    className="hover:bg-[#ffffff50] transition-all duration-75 mx-0 p-0"
                    OnClick={handleStop}
                  />
                  <Button
                    Icon={<IcRestart />}
                    className="hover:bg-[#ffffff50] transition-all duration-75 mx-0 p-0"
                    OnClick={handleStop}
                    Disabled={selectedTodo.seconds <= 0}
                  />
                </div>
              </div>
            </div>
            <div className="w-full justify-center text-center mt-8">
              <p
                className={`text-7xl font-black ${!selectedTodo?.isActive ? "text-otlined" : ""
                  }`}
              >
                {formatedTime(selectedTodo.seconds)}
              </p>
            </div>
          </div>
        </div>
      )}
      {children}
    </TodoModalContext.Provider>
  );
};

export default TodoModalProvider;
