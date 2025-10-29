import { ITask, ITaskSet } from "@/types/task";
import { useStorage } from "./useStorage";

export function useTask() {
  const { getAll } = useStorage<ITaskSet[]>({ key: "main" });

  const getTask = (name: string): ITaskSet | undefined => {
    const allSet = getAll();
    return undefined
  };

  const setTask = (taskSet: ITaskSet, task: ITask) => {};

  return { getTask };
}
