import { useBoard } from '../api/hooks/boards/queries';

function useTasksByStatus(boardId: string) {
  const { data: tasks, error, isLoading } = useBoard(boardId);

  const backlogTasks = tasks?.data.filter((task) => task.status === 'Backlog');
  const inProgressTasks = tasks?.data.filter(
    (task) => task.status === 'InProgress'
  );
  const doneTasks = tasks?.data.filter((task) => task.status === 'Done');

  return {
    backlogTasks,
    inProgressTasks,
    doneTasks,
    error,
    isLoading,
  };
}

export default useTasksByStatus;
