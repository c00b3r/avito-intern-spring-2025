import { useMutation, useQuery } from '@tanstack/react-query';
import { tasksApi } from '../../endpoints/tasks/tasks.api';
import { CreateTask, UpdateTask } from '../../endpoints/tasks/tasks.types';
import { TaskStatus } from '../../../types/enum';

export const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: () => tasksApi.getAllTasks(),
  });
};

export const useTask = (taskId: number) => {
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
      taskId: number;
      newTask: UpdateTask;
    }) => tasksApi.updateTask(taskId, newTask),
  });
};

export const useUpdateTaskStatus = () => {
  return useMutation({
    mutationFn: ({
      taskId,
      newStatus,
    }: {
      taskId: number;
      newStatus: TaskStatus;
    }) => tasksApi.updateTaskStatus(taskId, newStatus),
  });
};
