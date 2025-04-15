import { useNavigate, useParams } from 'react-router';
import { useBoards } from '../../api/hooks/boards/queries';
import { Alert, Card, Flex, Spin } from 'antd';
import Title from 'antd/es/typography/Title';
import useTasksByStatus from '../../hooks/useTasksByStatus';
import { useState } from 'react';
import UpdateTaskModal from '../../component/ModalTask/UpdateTaskModal';
import { BoardTask } from '../../api/endpoints/boards/boards.types';
import TaskColumn from '../../component/TaskColumn/TaskColumn';
import { LoadingOutlined } from '@ant-design/icons';
import { useUpdateTaskStatus } from '../../api/hooks/tasks/queries';
import { TaskStatus } from '../../types/enum';
import { useQueryClient } from '@tanstack/react-query';

function BoardPage() {
  const queryClient = useQueryClient();
  const { id = '' } = useParams();
  const { data: boards } = useBoards();
  const { backlogTasks, inProgressTasks, doneTasks, error, isLoading } =
    useTasksByStatus(+id);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<BoardTask | null>(null);
  const [draggedTask, setDraggedTask] = useState<BoardTask | null>(null);
  const { mutate: updateTaskStatus } = useUpdateTaskStatus();

  const navigate = useNavigate();
  if (!boards?.data.some((elem) => elem.id === +id)) {
    navigate('/boards');
  }

  const boardTitle = boards?.data.find((b) => String(b.id) === id)?.name;

  const handleTaskClick = (task: BoardTask) => {
    setSelectedTask(task);
    setIsModalUpdateOpen(true);
  };

  const handleDrop = async (status: TaskStatus) => {
    if (!draggedTask) return;

    updateTaskStatus(
      { taskId: draggedTask.id, newStatus: status },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['board', +id] });
        },
      }
    );
  };

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
        <Alert message='Ошибка загрузки проекта' type='error' showIcon />
      </div>
    );
  }

  return (
    <>
      <Card>
        <Title level={3}>{boardTitle}</Title>
        {selectedTask && (
          <UpdateTaskModal
            isOpen={isModalUpdateOpen}
            handleClose={() => setIsModalUpdateOpen(false)}
            task={selectedTask}
            boardId={+id}
            fromBoard={true}
          />
        )}
        <Flex gap='small' justify='space-between'>
          <TaskColumn
            title='Бэклог'
            tasks={backlogTasks}
            onTaskClick={handleTaskClick}
            onDrop={() => handleDrop(TaskStatus.Backlog)}
            onDragStart={setDraggedTask}
          />
          <TaskColumn
            title='В процессе'
            tasks={inProgressTasks}
            onTaskClick={handleTaskClick}
            onDrop={() => handleDrop(TaskStatus.InProgress)}
            onDragStart={setDraggedTask}
          />
          <TaskColumn
            title='Выполнено'
            tasks={doneTasks}
            onTaskClick={handleTaskClick}
            onDrop={() => handleDrop(TaskStatus.Done)}
            onDragStart={setDraggedTask}
          />
        </Flex>
      </Card>
    </>
  );
}

export default BoardPage;
