"use client";
import {
  ITodo,
  TodoModalContextType,
  TodoContextType,
  ISubTodo,
  ITodoConfig,
  IPomodoroItem,
} from "@/types/core/type";
import React, {
  MouseEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { TodoContext } from "./TodoContext";
import { formatTime, getSplitedTime, wait } from "@/lib/libs";
import IcPause from "@/components/icons/IcPause";
import IcPlay from "@/components/icons/IcPlay";
import IcRestart from "@/components/icons/IcRestart";
import Button from "@/components/ui/Button";
import { simpleTodo, simpleTodoConfig } from "@/mocks/todo.tamplates";
import IcSettings from "@/components/icons/IcSettings";
import TextInput from "@/components/ui/TextInput";
import IcChatBubble from "@/components/icons/IcChatBubble";
import IcEdit from "@/components/icons/IcEdit";
import Modal from "@/components/ui/Modal";
import IcClock from "@/components/icons/IcClock";
import IcBolt from "@/components/icons/IcBolt";
import IcIdea from "@/components/icons/IcIdea";
import { appConfig } from "@/app.config";

export const TodoModalContext =
  React.createContext<TodoModalContextType | null>(null);

const TodoModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedTodo, setSelectedTodo] = useState<ITodo>(simpleTodo);
  const {
    getTodos,
    resumeOrStartTodo,
    stopTodo,
    secondsOfActive,
    updateTodoStorage,
  } = useContext(TodoContext) as TodoContextType;
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const formatedTime = (t: number) => formatTime(getSplitedTime(t));

  const handlePlay = (e: React.MouseEvent) => {
    resumeOrStartTodo(selectedTodo);
  };

  const handleStop = async (e: React.MouseEvent) => {
    stopTodo(selectedTodo);
    setPomodorosItemsForTodo(selectedTodo);
  };

  const onOpen = (todo: ITodo) => {
    setIsOpen(true);
    setSelectedTodo(todo);
    setPomodorosItemsForTodo(todo);
    updatePomodoroPercentaje();
  };

  const onClose = async () => {
    modalRef.current?.classList.remove("move-up-animation");
    await wait(1);
    modalRef.current?.classList.add("move-down-animation");
    setTimeout(() => {
      setIsOpen(false);
    }, 280);
  };

  const [inEditTodo, setInEditTodo] = useState<ITodo>(simpleTodo);
  const [todoConfig, setTodoConfig] = useState<ITodoConfig>(simpleTodoConfig);

  const onOpenEditModal = (todo: ITodo) => {
    setInEditTodo(todo);
    setTodoConfig(todo?.config ?? simpleTodoConfig);
    setIsOpenEditModal(true);
  };

  useEffect(() => {
    updatePomodoroPercentaje();
    
  }, [selectedTodo]);

  const onCloseEditModal = () => {
    if (!isOpenEditModal) return;

    setIsOpenEditModal(false);
  };
  const onSubmitEdit = () => {
    onCloseEditModal();

    selectedTodo.title = inEditTodo.title;
    selectedTodo.config = todoConfig;
    setSelectedTodo(selectedTodo);
    updateTodoStorage();
    setPomodorosItemsForTodo(inEditTodo);
  };

  const setPomodorosItemsForTodo = (todo: ITodo) => {
    if (todo.config == null) {
      setpomodorosItem([]);
      return;
    }
    let pomodoros: IPomodoroItem[] = [];
    let seconds = 0;
    for (let i = 1; i <= todo.config.intervals; i++) {
      const isBreak = i % 2 == 0;
      const targetSeconds = isBreak
        ? todo.config.breakDurations
        : todo.config.duration;

      // saltar todos los pomodores ya hechos
      seconds += targetSeconds * appConfig.pomodoro?.timeScale; // esta en minutos asi que * 60 pa segundos
      if (seconds < todo.seconds) {
        continue;
      }
      //

      pomodoros = [
        ...pomodoros,
        {
          id: i,
          seconds: !isBreak ? todo.config.duration : todo.config.breakDurations,
          icon: !isBreak ? <IcIdea /> : <IcClock />,
          title: !isBreak ? "Tlabaja, tienes que tlabajal" : "Break",
          isBreak,
          percentaje: 0,
        },
      ];
    }
    setpomodorosItem(pomodoros);
  };

  useEffect(() => {
    if (!selectedTodo.isActive || selectedTodo.config == null) return;

    const [currentPomodorItem] = pomodorosItem;
    if (currentPomodorItem == undefined) return;

    selectedTodo.config.seconds += 1;

    updatePomodoroPercentaje();

    if (selectedTodo.config.seconds > currentPomodorItem.seconds) {
      selectedTodo.config.seconds = 0;
      setPomodorosItemsForTodo(selectedTodo);
      updatePomodoroPercentaje(0);
    }
  }, [secondsOfActive]);

  const updatePomodoroPercentaje = (v?: number) => {
    if (v != null) {
      setPomodoroPercentaje(v);
      return;
    }
    if (selectedTodo == null || selectedTodo.config == null) return;

    const [currentPomodorItem] = pomodorosItem;
    if (currentPomodorItem == undefined) return;

    const targetSeconds = currentPomodorItem.isBreak
      ? selectedTodo.config.breakDurations
      : selectedTodo.config.duration;

    setPomodoroPercentaje((selectedTodo.config.seconds / targetSeconds) * 100);
  };

  const [pomodoroPercentaje, setPomodoroPercentaje] = useState<number>(0);
  const [pomodorosItem, setpomodorosItem] = useState<IPomodoroItem[]>([]);

  return (
    <TodoModalContext.Provider value={{ onOpen }}>
      {isOpen && (
        <>
          <div
            className="fixed top-0 w-screen h-screen z-50 backdrop-blur-lg"
            onClick={onClose}
          >
            <div
              className="move-up-animation flex flex-col justify-center items-center"
              ref={modalRef}
            >
              <div
                className="my-16 text-4xl bg-[#181818] rounded-4xl mx-auto flex justify-between items-center relative mb-4 w-[90%] p-4 max-w-[700px] todo-modal cursor-pointer"
                onClick={onClose}
              >
                <div className="flex justify-between w-full items-center">
                  <p className="font-bold truncate mr-3">
                    {selectedTodo?.id}-{selectedTodo?.title}
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
                  className={`text-7xl max-sm:text-5xl font-black ${
                    !selectedTodo?.isActive ? "text-otlined" : ""
                  }`}
                >
                  {formatedTime(selectedTodo.seconds)}
                </p>
              </div>
              {/* POMODORO */}
              {pomodorosItem && pomodorosItem.length > 0 && (
                <ul className="max-sm:w-full p-8 relative mt-12 sm:max-w-[800px] sm:w-full">
                  <div className="absolute right-12 -top-4 rounded-3xl bg-blue-500 px-4 py-1 z-10 items-center flex justify-center shadow-md gap-4">
                    <IcClock />
                    {pomodorosItem[0].id} / {selectedTodo.config?.intervals}
                  </div>
                  {pomodorosItem.slice(0, 4).map((item, key) => (
                    <li
                      key={key}
                      className="absolute bg-[#181818] p-6 rounded-4xl w-[90%] flex justify-start items-center left-[50%] top-0 translate-x-[-50%] shadow-2xl overflow-hidden"
                      style={{
                        marginTop: key * 32 + "px",
                        zIndex: -key,
                        scale: Math.max(1 - key * 0.05, 0.75),
                      }}
                    >
                      <span>{item.icon}</span>
                      {item.title}
                      {item.id == pomodorosItem[0].id && (
                        <div
                          className="absolute -top-8 -left-8 h-[200%] bg-blue-500 -z-10 rainbow transition-all duration-75 blur-2xl"
                          style={{ width: pomodoroPercentaje + "%" }}
                        ></div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>
      )}
      {/* MODAL */}
      <Modal
        isOpen={isOpenEditModal}
        title={`Config ${selectedTodo.title}`}
        onClose={onCloseEditModal}
        onSubmit={onSubmitEdit}
      >
        <div className="content">
          <TextInput
            Placeholder="Task title"
            OnChange={(v) => {
              setInEditTodo((prev) => prev && { ...prev, title: v });
            }}
            Value={inEditTodo?.title}
            Label={{ Name: "Title", Icon: <IcChatBubble /> }}
            SubmitConfig={{
              Icon: <IcEdit />,
              IconBlur: false,
              Disabled: true,
            }}
          />
          <div className="mt-6" />
          <TextInput
            Placeholder="Intervals"
            OnChange={(v) => {
              setTodoConfig(
                (prev) => prev && { ...prev, intervals: Number.parseInt(v) }
              );
            }}
            Value={todoConfig.intervals.toString()}
            Type="number"
            Label={{ Name: "Pomodoro", Icon: <IcClock /> }}
            SubmitConfig={{
              Icon: <IcEdit />,
              IconBlur: false,
              Disabled: true,
            }}
          />
          <div className="flex gap-3">
            <TextInput
              Placeholder=""
              Type="number"
              OnChange={(v) => {
                setTodoConfig(
                  (prev) => prev && { ...prev, duration: Number.parseInt(v) }
                );
              }}
              Value={todoConfig.duration.toString()}
              Label={{ Name: "Active time " + appConfig.pomodoro.timeAlias }}
              SubmitConfig={{
                Icon: <IcEdit />,
                IconBlur: false,
                Disabled: true,
              }}
            />
            <TextInput
              Placeholder="Durations"
              Type="number"
              OnChange={(v) => {
                setTodoConfig(
                  (prev) =>
                    prev && { ...prev, breakDurations: Number.parseInt(v) }
                );
              }}
              Value={todoConfig.breakDurations.toString()}
              Label={{ Name: "Break time " + appConfig.pomodoro.timeAlias }}
              SubmitConfig={{
                Icon: <IcEdit />,
                IconBlur: false,
                Disabled: true,
              }}
            />
          </div>
        </div>
      </Modal>

      {children}
    </TodoModalContext.Provider>
  );
};

export default TodoModalProvider;
