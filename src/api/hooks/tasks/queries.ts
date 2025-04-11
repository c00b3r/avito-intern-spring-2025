import { useMutation, useQuery } from '@tanstack/react-query';
import { tasksApi } from '../../endpoints/tasks/tasks.api';
import { CreateTask } from '../../endpoints/tasks/tasks.types';
import { TaskStatus } from '../../../types/enum';

export const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: () => tasksApi.getAllTasks(),
  });
};

export const useTask = (taskId: string) => {
  return useQuery({
    queryKey: ['task', taskId],
    queryFn: () => tasksApi.getTaskById(taskId),
  });
};

export const useCreateTask = () => {
  return useMutation({
    mutationFn: (task: CreateTask) => tasksApi.createTask(task),
  });
};

export const useUpdateTask = () => {
  return useMutation({
    mutationFn: ({
      taskId,
      newTask,
    }: {
      taskId: string;
      newTask: CreateTask;
    }) => tasksApi.updateTask(taskId, newTask),
  });
};

export const useUpdateTaskStatus = () => {
  return useMutation({
    mutationFn: ({
      taskId,
      newStatus,
    }: {
      taskId: string;
      newStatus: TaskStatus;
    }) => tasksApi.updateTaskStatus(taskId, newStatus),
  });
};
