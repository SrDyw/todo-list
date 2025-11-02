import { ITodo } from "@/types/core/type";

export const simpleTodo: ITodo = {
    deleted: false,
    id: Math.random().toString(),
    isActive: false,
    seconds: 0,
    title: "Simple todo",
};
