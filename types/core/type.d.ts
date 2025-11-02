export interface ITodo {
  id: string;
  title: string;
  deleted: boolean;
  isActive: boolean;
  seconds: number
}

export type TodoContextType = {
  todos: ITodo[];
  saveTodos: (todo: ITodo) => void;
  deleteTodo: (id: string) => void;
  getTodos: () => ITodo[];
  resumeOrStartTodo: (todo: ITodo) => void
};

export type TodoModalContextType = {
  onOpen: (todo: ITodo) => void;
};

export type TodoModalType = {
  isOpen: boolean;
};
