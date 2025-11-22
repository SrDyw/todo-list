import { ITodo, ITodoConfig } from "@/types/core/type";

export const simpleTodoConfig: ITodoConfig = {
  seconds: 0,
  duration: 25,
  intervals: 4,
  isBreakTimeActive: false,
  breakDurations: 10
};

export const simpleTodo: ITodo = {
  deleted: false,
  id: Math.random().toString(),
  isActive: false,
  seconds: 0,
  title: "Simple todo",
  config: simpleTodoConfig,
};
