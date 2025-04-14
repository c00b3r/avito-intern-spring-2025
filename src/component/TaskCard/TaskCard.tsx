import { Card } from 'antd';
import Title from 'antd/es/typography/Title';
import { BoardTask } from '../../api/endpoints/boards/boards.types';

interface TaskCardProps {
  task: BoardTask;
  onClick: (task: BoardTask) => void;
}

function TaskCard({ task, onClick }: TaskCardProps) {
  return (
    <Card hoverable onClick={() => onClick(task)} className='bg-gray-100!'>
      <Title level={5}>{task.title}</Title>
    </Card>
  );
}

export default TaskCard;
