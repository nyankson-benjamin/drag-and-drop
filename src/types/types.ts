export type Id = string | number;
export type columns = {
  id: Id;
  title: string;
};

export type ColumnsProps = {
  columns: columns[];
};

export type columnProp = {
  column: columns;
};

export type BtnProps = {
  text: string;
  onSubmit?: () => void;
  children?: React.ReactNode;
  styles?: string;
};

export type InputProps = {
  value: Id;
  onBlur?: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
};
export type TextAreaProps = {
  value: Id;
  onBlur?: () => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
};

export type Task = {
  id: Id;
  columnId: Id;
  content: string;
};

export type TaskContainerProps = {
  tasks: Task[];
};

export type TaskItemProps = {
  task: Task;
};

export type ColumnsStore = {
  columns: columns[];
  tasks: Task[];
  addColumn: (newColumn: columns) => void;
  removeColumn: (id: Id) => void;
  setColumns: (newColumns: columns[]) => void;
  updateColumnTitle: (id: Id, title: string) => void;
  addTask: (newTask: Task) => void;
  removeTask: (columnId: Id, taskId: Id) => void;
  setTasks: (newTasks: Task[]) => void;
  updateTask: (taskId: Id, columnId: Id, content: string) => void;

};
