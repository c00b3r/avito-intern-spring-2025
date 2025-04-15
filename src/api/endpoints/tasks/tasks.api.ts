import { TaskStatus } from '../../../types/enum';
import { axiosClient } from '../../axios/axios-client';
import { CreateTask, Task, TaskResponse, UpdateTask } from './tasks.types';

export const tasksApi = {
  getAllTasks: async (): Promise<TaskResponse> => {
    const { data } = await axiosClient.get<TaskResponse>('/tasks');
    return data;
  },

  getTaskById: async (taskId: number): Promise<Task> => {
    const { data } = await axiosClient.get<Task>(`/tasks/${taskId}`);
    return data;
  },

  createTask: async (task: CreateTask): Promise<Task> => {
    const { data } = await axiosClient.post<Task>('/tasks/create', task);
    return data;
  },

  updateTask: async (taskId: number, task: UpdateTask): Promise<Task> => {
    const { data } = await axiosClient.put<Task>(
      `/tasks/update/${taskId}`,
      task
    );
    return data;
  },

  updateTaskStatus: async (
    taskId: number,
    status: TaskStatus
  ): Promise<Task> => {
    const { data } = await axiosClient.put<Task>(
      `/tasks/updateStatus/${taskId}`,
      { status }
    );

    return data;
  },
};
