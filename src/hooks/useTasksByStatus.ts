import { useBoard } from '../api/hooks/boards/queries';

function useTasksByStatus(boardId: number) {
  const { data: tasks, error, isLoading } = useBoard(boardId);

  const sortedTasks = tasks?.data.sort((a, b) => a.id - b.id);

  const backlogTasks = sortedTasks?.filter((task) => task.status === 'Backlog');
  const inProgressTasks = sortedTasks?.filter(
    (task) => task.status === 'InProgress'
  );
  const doneTasks = sortedTasks?.filter((task) => task.status === 'Done');

  return {
    backlogTasks,
    inProgressTasks,
    doneTasks,
    error,
    isLoading,
  };
}

export default useTasksByStatus;
