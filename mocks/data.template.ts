import { generateId } from "@/lib/libs";
import { IAppData, ISession } from "@/types/core/type";

export const BaseAppData = () => {
  return {
    sesions: [],
  };
};

export const BaseSessionData = () => {
  return {
    id: generateId(),
    title: new Date().toDateString() + Math.random().toString().slice(0, 4),
    todos: [],
    deleted: false,
  } as ISession;
};
