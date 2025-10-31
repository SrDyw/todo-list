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
      className={`bg-[#181818] p-2 pl-4 rounded-3xl mx-auto fade-in-animation flex justify-between items-center relative task-item mb-4 w-[90%] hover:scale-[1.05] transition duration-150 rainbow-outline ${className}`}
      id={todo.id}
      onClick={() => onClick?.(todo)}
    >
      <p className="font-semibold">{todo.title}</p>
      {children}
    </li>
  ) : (
    <></>
  );
};
