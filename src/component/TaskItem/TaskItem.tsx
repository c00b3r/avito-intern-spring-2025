import {
  CarryOutOutlined,
  FundProjectionScreenOutlined,
} from '@ant-design/icons';
import { Avatar, Card, Tag } from 'antd';
import type { Task } from '../../api/endpoints/tasks/tasks.types';
import {
  statusColors,
  statusName,
  priorityColors,
  priorityName,
} from '../../const/issue';
import Title from 'antd/es/typography/Title';
import { BoardTask } from '../../api/endpoints/boards/boards.types';

interface TaskProps {
  task: Task | BoardTask;
  setOpenModal: (isOpen: boolean) => void;
}

function TaskItem({ task, setOpenModal }: TaskProps) {
  return (
    <>
      <Card
        key={task.id}
        hoverable
        className='w-full mb-2!'
        onClick={() => {
          setOpenModal(true);
        }}
      >
        <Tag color={statusColors[task.status]} icon={<CarryOutOutlined />}>
          {statusName[task.status]}
        </Tag>
        <Tag
          color={priorityColors[task.priority]}
          icon={<FundProjectionScreenOutlined />}
        >
          {priorityName[task.priority]}
        </Tag>
        <Avatar src={task.assignee.avatarUrl} size={24} />
        <Title level={5}>{task.title}</Title>
      </Card>
    </>
  );
}

export default TaskItem;
