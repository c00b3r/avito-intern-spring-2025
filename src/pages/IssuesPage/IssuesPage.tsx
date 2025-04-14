import { Alert, Card, Space, Spin } from 'antd';
import { useTasks } from '../../api/hooks/tasks/queries';
import { LoadingOutlined } from '@ant-design/icons';
import { useState, useMemo } from 'react';
import CreateTaskModal from '../../component/ModalTask/CreateTaskModal';
import UpdateTaskModal from '../../component/ModalTask/UpdateTaskModal';
import { Task } from '../../api/endpoints/tasks/tasks.types';
import { useBoards } from '../../api/hooks/boards/queries';
import TaskFilters from '../../component/TaskFilters/TaskFilters';
import TaskList from '../../component/TaskList/TaskList';
import { Filters } from '../../types/interface';

function IssuesPage() {
  const { data: tasks, error, isLoading } = useTasks();
  const { data: boards } = useBoards();

  const [filters, setFilters] = useState<Filters>({
    status: '',
    boardId: '',
    search: '',
  });

  const handleFilterChange = (key: keyof Filters, value: string | number) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const filteredTasks = useMemo(() => {
    const tasksData = tasks?.data || [];

    return tasksData.filter((task) => {
      const matchesStatus = !filters.status || task.status === filters.status;
      const matchesBoard = !filters.boardId || task.boardId === filters.boardId;
      const matchesSearch =
        !filters.search ||
        task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        task.description
          ?.toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        task.assignee.fullName
          .toLowerCase() 
          .includes(filters.search.toLowerCase());

      return matchesStatus && matchesBoard && matchesSearch;
    });
  }, [filters.boardId, filters.search, filters.status, tasks?.data]);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

  if (isLoading) {
    return (
      <div className='h-full flex justify-center items-center'>
        <Spin indicator={<LoadingOutlined />} size='large' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='h-full flex justify-center items-center'>
        <Alert message='Ошибка загрузки задач' type='error' showIcon />
      </div>
    );
  }

  return (
    <Card>
      <Space direction='vertical' className='w-full' size={0}>
        {isModalCreateOpen && (
          <CreateTaskModal
            isOpen={isModalCreateOpen}
            handleClose={() => setIsModalCreateOpen(false)}
          />
        )}
        {selectedTask && (
          <UpdateTaskModal
            isOpen={isModalUpdateOpen}
            handleClose={() => setIsModalUpdateOpen(false)}
            task={selectedTask}
          />
        )}
        <TaskFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          boards={boards?.data}
          totalTasks={filteredTasks.length}
          onCreateTask={() => setIsModalCreateOpen(true)}
        />
        <TaskList
          tasks={filteredTasks}
          onTaskClick={(task) => {
            setSelectedTask(task);
            setIsModalUpdateOpen(true);
          }}
        />
      </Space>
    </Card>
  );
}

export default IssuesPage;
