export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

export interface CreateTask {
  title: string;
  description: string;
}

export interface UpdateTask {
  title: string;
  description: string;
  status: string;
}
