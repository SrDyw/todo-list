import { ITodo } from "@/types/core/type";
import React from "react";

export const TodoItem = ({
  todo,
  children,
  className,
  onClick,
}: {
  todo: ITodo | null;
  children?: React.ReactNode;
  className?: string;
  onClick?: (todo: ITodo) => void;
}) => {
  return todo != null ? (
    <li
      className={`p-2 pl-4 rounded-3xl mx-auto fade-in-animation flex justify-between items-center relative task-item mb-4 w-[90%] ${className} rainbow-outline hover:scale-[1.05] transition duration-75 `}
      id={todo.id}
      onClick={() => onClick?.(todo)}
    >
      <p className="font-semibold">{todo.title}</p>
      {children}
      <div className="w-full h-full bg-[#181818] absolute top-0 left-0 -z-10 rounded-3xl"></div>
      <div className={`rounded-3xl absolute ${todo.isActive ? 'task-active-eff' : ''} rainbow`}></div>
    </li>
  ) : (
    <></>
  );
};

// bg-[#181818]
