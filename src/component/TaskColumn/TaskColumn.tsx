import { Card, Space } from 'antd';
import { BoardTask } from '../../api/endpoints/boards/boards.types';
import TaskCard from '../TaskCard/TaskCard';

interface TaskColumnProps {
  title: string;
  tasks?: BoardTask[];
  onTaskClick: (task: BoardTask) => void;
}

function TaskColumn({ title, tasks, onTaskClick }: TaskColumnProps) {
  return (
    <Card title={title} className='w-1/3'>
      <Space direction='vertical' className='w-full'>
        {tasks?.map((task) => (
          <TaskCard key={task.id} task={task} onClick={onTaskClick} />
        ))}
      </Space>
    </Card>
  );
}

export default TaskColumn;
