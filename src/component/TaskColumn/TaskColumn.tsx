import { Card, Space } from 'antd';
import { BoardTask } from '../../api/endpoints/boards/boards.types';
import TaskCard from '../TaskCard/TaskCard';

interface TaskColumnProps {
  title: string;
  tasks?: BoardTask[];
  onTaskClick: (task: BoardTask) => void;
  onDrop: () => void;
  onDragStart: (task: BoardTask) => void;
}

function TaskColumn({
  title,
  tasks,
  onTaskClick,
  onDrop,
  onDragStart,
}: TaskColumnProps) {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.style.opacity = '0.8';
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.opacity = '1';
  };

  return (
    <Card
      title={title}
      className='w-1/3 border-black!'
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={(e) => {
        e.preventDefault();
        e.currentTarget.style.opacity = '1';
        onDrop();
      }}
    >
      <Space
        direction='vertical'
        className='w-full'
        onDragOver={handleDragOver}
      >
        {tasks?.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={onTaskClick}
            onDragStart={() => onDragStart(task)}
          />
        ))}
      </Space>
    </Card>
  );
}

export default TaskColumn;
