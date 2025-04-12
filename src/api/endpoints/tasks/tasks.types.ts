import { TaskPriority, TaskStatus } from '../../../types/enum';

interface TaskResponse {
  data: Task[];
}

interface Task {
  assignee: {
    avatarUrl: string;
    email: string;
    fullName: string;
    id: number;
  };
  boardId: number;
  boardName: string;
  description: string;
  id: number;
  priority: TaskPriority;
  status: TaskStatus;
  title: string;
}

interface CreateTask {
  assigneeId: number;
  boardId: number;
  description: string;
  priority: TaskPriority;
  title: string;
}

interface UpdateTaskStatus {
  status: TaskStatus;
}

export type { Task, CreateTask, UpdateTaskStatus, TaskResponse };
