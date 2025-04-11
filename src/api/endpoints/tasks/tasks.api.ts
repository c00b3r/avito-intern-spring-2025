import { axiosClient } from '../../axios/axios-client';
import { CreateTask, Task, UpdateTaskStatus } from './tasks.types';

const tasksApi = {
  getAllTasks: async (): Promise<Task[]> => {
    const { data } = await axiosClient.get<Task[]>('/tasks');
    return data;
  },

  getTaskById: async (taskId: string): Promise<Task> => {
    const { data } = await axiosClient.get<Task>(`/tasks/${taskId}`);
    return data;
  },

  createTask: async (task: CreateTask): Promise<Task> => {
    const { data } = await axiosClient.post<Task>('/tasks/create', task);
    return data;
  },

  updateTask: async (
    taskId: string,
    task: Partial<CreateTask>
  ): Promise<Task> => {
    const { data } = await axiosClient.put<Task>(
      `/tasks/update/${taskId}`,
      task
    );
    return data;
  },

  updateTaskStatus: async (
    taskId: string,
    status: UpdateTaskStatus
  ): Promise<Task> => {
    const { data } = await axiosClient.put<Task>(
      `/tasks/updateStatus/${taskId}`,
      status
    );
    return data;
  },
};
export default tasksApi;
