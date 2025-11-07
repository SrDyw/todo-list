export interface ITodo {
  id: string;
  title: string;
  deleted: boolean;
  isActive: boolean;
  seconds: number;
  config?: ITodoConfig;
}

export interface ITodoConfig {
  duration: number;
  intervals: number;
  isBreakTimeActive: boolean;
  seconds: number;
  breakDurations: number;
}

export interface IPomodoroItem {
  title: string;
  icon: React.ReactNode;
  seconds: number;
  isBreak: boolean;
  id: number;
  percentaje: number
}

export interface ISubTodo {
  id: string;
  title: string;
  stopwatchValue: number;
}

export type TodoContextType = {
  todos: ITodo[];
  saveTodos: (todo: ITodo) => void;
  deleteTodo: (id: string) => void;
  getTodos: () => ITodo[];
  resumeOrStartTodo: (todo: ITodo) => void;
  stopTodo: (todo: ITodo) => void;
  secondsOfActive: number;
  updateTodoStorage: () => void;
};

export type TodoModalContextType = {
  onOpen: (todo: ITodo) => void;
};

export type TodoModalType = {
  isOpen: boolean;
};


export interface AppConfig {
  pomodoro: {
    timeScale: number,
    timeAlias: "(m)" | "(s)"
  }
}