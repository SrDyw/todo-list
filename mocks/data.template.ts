import { generateId } from "@/lib/libs";
import { IAppData, ISession } from "@/types/core/type";

export const BaseAppData: IAppData = {
  sesions: [],
};

export const BaseSessionData: ISession = {
  id: generateId(),
  title: new Date().toDateString(),
  todos: [],
};
