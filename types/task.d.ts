export interface ITask {
  name: string;
  content: string;
  createAt: Date;
}

export interface ITaskSet {
  name: string;
  task: ITask[];
}
