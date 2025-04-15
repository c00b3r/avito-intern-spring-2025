import { Card } from 'antd';
import Title from 'antd/es/typography/Title';
import { BoardTask } from '../../api/endpoints/boards/boards.types';

interface TaskCardProps {
  task: BoardTask;
  onClick: (task: BoardTask) => void;
  onDragStart: (task: BoardTask) => void;
}

function TaskCard({ task, onClick, onDragStart }: TaskCardProps) {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', task.id.toString());
    onDragStart(task);
  };

  return (
    <Card
      hoverable
      onClick={() => onClick(task)}
      className='bg-gray-100!'
      draggable
      onDragStart={handleDragStart}
    >
      <Title level={5}>{task.title}</Title>
    </Card>
  );
}

export default TaskCard;
