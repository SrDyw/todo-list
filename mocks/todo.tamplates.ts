import { ITodo, ITodoConfig } from "@/types/core/type";

export const simpleTodoConfig: ITodoConfig = {
  seconds: 0,
  duration: 0,
  intervals: 0,
  isBreakTimeActive: false,
  breakDurations: 0
};

export const simpleTodo: ITodo = {
  deleted: false,
  id: Math.random().toString(),
  isActive: false,
  seconds: 0,
  title: "Simple todo",
  config: simpleTodoConfig,
};
