export interface ITodo {
  id: string;
  title: string;
  deleted: boolean;
  startedAt: Date;
  started: boolean;
}

export type TodoContextType = {
  todos: ITodo[];
  saveTodos: (todo: ITodo) => void;
  deleteTodo: (id: string) => void;
  getActiveTodos: () => ITodo[];
};

export type TodoModalContextType = {
  setSelectedTodo: (todo: ITodo) => void;
};

export type TodoModalType = {
  isOpen: boolean;
};
