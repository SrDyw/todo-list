"use client";

import { TodoItem } from "@/components/TodoItem";
import {
  ITodo,
  TodoModalContextType,
  TodoContextType,
  ISubTodo,
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
import IcClose from "@/components/icons/IcClose";
import TextInput from "@/components/ui/TextInput";
import IcChatBubble from "@/components/icons/IcChatBubble";
import IcEdit from "@/components/icons/IcEdit";

const subtodo: ISubTodo[] = [
  {
    id: Math.random().toString(),
    stopwatchValue: 10,
    title: "Subtodo 1",
  },
  {
    id: Math.random().toString(),
    stopwatchValue: 10,
    title: "Subtodo 2",
  },
  {
    id: Math.random().toString(),
    stopwatchValue: 10,
    title: "Subtodo 3",
  },
  {
    id: Math.random().toString(),
    stopwatchValue: 10,
    title: "Subtodo 3",
  },
];

export const TodoModalContext =
  React.createContext<TodoModalContextType | null>(null);

const TodoModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedTodo, setSelectedTodo] = useState<ITodo>(simpleTodo);
  const { getTodos, resumeOrStartTodo, stopTodo } = useContext(
    TodoContext
  ) as TodoContextType;
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const formatedTime = (t: number) => formatTime(getSplitedTime(t));

  const handlePlay = (e: React.MouseEvent) => {
    resumeOrStartTodo(selectedTodo);
  };

  const handleStop = (e: React.MouseEvent) => {
    stopTodo(selectedTodo);
  };

  const onOpen = (todo: ITodo) => {
    setIsOpen(true);
    setSelectedTodo(todo);
  };

  const onOpenEditModal = (todo: ITodo) => {
    setIsOpenEditModal(true);
  };

  const onCloseEditModal = () => {
    setIsOpenEditModal(false);
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

  const onConfigTitleChanged = (e: string) => {
    console.log(e);
    setSelectedTodo((prev) => ({ ...prev, title: e }));
  };

  const onSubmitEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    alert(e.currentTarget.value);
  };

  return (
    <TodoModalContext.Provider value={{ onOpen }}>
      {isOpen && (
        <>
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
                  <p className="font-bold truncate mr-3">
                    {selectedTodo?.title}
                  </p>
                  <div className="button-section flex gap-3 items-center justify-center bg-[#00000055] rounded-4xl p-2">
                    <Button
                      Icon={selectedTodo.isActive ? <IcPause /> : <IcPlay />}
                      className="hover:bg-[#ffffff50] transition-all duration-75 mx-0 p-4"
                      OnClick={handlePlay}
                    />
                    <Button
                      Icon={<IcSettings />}
                      className="hover:bg-[#ffffff50] transition-all duration-75 mx-0 p-0"
                      OnClick={() => onOpenEditModal(selectedTodo)}
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
                  className={`text-7xl font-black ${
                    !selectedTodo?.isActive ? "text-otlined" : ""
                  }`}
                >
                  {formatedTime(selectedTodo.seconds)}
                </p>
              </div>

              {/* DOTS */}
              <div className="w-[80%] mt-8">
                <ul className="flex justify-center items-center flex-col gap-6 w-full ">
                  {selectedTodo.config?.subtodos.map((x, index) => (
                    <li
                      key={x.id}
                      className="flex justify-start items-center gap-3 relative bg-[#1f1f1f] rounded-4xl p-4 w-[300px]"
                    >
                      <span className="rounded-full size-4 bg-white relative">
                        {index != selectedTodo.config!.subtodos.length - 1 && (
                          <span className="absolute left-[50%] translate-x-[-50%] top-4 h-16 w-0.5 bg-white z-10"></span>
                        )}
                      </span>
                      {x.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
      {/* MODAL */}
      {isOpenEditModal && (
        <div
          className="fixed w-screen h-screen z-50 bg-[#0000009f]"
          onClick={onCloseEditModal}
        >
          <div
            className="absolute max-sm:w-full max-sm:bottom-0 left-[50%] translate-x-[-50%] md:top-[50%] md:translate-y-[-50%] w-[500px] h-[300px] shadow-2xl "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 w-full bg-[#181818] h-full z-0 p-6 rounded-2xl fle flex-col">
              {/* HEADER */}
              <div className="header justify-between flex items-center bg-[#121212] rounded-3xl p-2 px-4 mb-4">
                <p className="font-black text-2xl truncate">
                  Config {selectedTodo.title}
                </p>
                <Button Icon={<IcClose />} OnClick={onCloseEditModal} />
              </div>
              {/* CONTENT */}
              <div className="content">
                <TextInput
                  Placeholder="Task title"
                  OnChange={onConfigTitleChanged}
                  Value={selectedTodo.title}
                  Label={{ Name: "Title", Icon: <IcChatBubble /> }}
                  SubmitConfig={{
                    Icon: <IcEdit />,
                    IconBlur: false,
                    Disabled: true,
                  }}
                />
              </div>
              {/* FOOTER */}
              <div className="footer absolute bottom-0 left-0 p-4 flex justify-end items-center w-full gap-3">
                <Button
                  Content="Accept"
                  className="bg-blue-500 hover:bg-white hover:text-gray-900"
                  Icon={<IcEdit />}
                  IconBlur={false}
                />
                <Button Content="Cancel" />
              </div>
            </div>
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rainbow w-[calc(100%+2px)] h-[calc(100%+2px)] -z-10 rounded-2xl"></div>
          </div>
        </div>
      )}
      {children}
    </TodoModalContext.Provider>
  );
};

export default TodoModalProvider;
