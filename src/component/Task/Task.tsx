import {
  CarryOutOutlined,
  FundProjectionScreenOutlined,
} from '@ant-design/icons';
import { Card, Tag } from 'antd';
import type { Task } from '../../api/endpoints/tasks/tasks.types';
import {
  statusColors,
  statusName,
  priorityColors,
  priorityName,
} from '../../const/issue';
import Title from 'antd/es/typography/Title';

function Task({
  task,
  onSelect,
  setOpenModal,
}: {
  task: Task;
  onSelect: (task: Task) => void;
  setOpenModal: (isOpen: boolean) => void;
}) {
  return (
    <>
      <Card
        key={task.id}
        hoverable
        className='w-full mb-2!'
        onClick={() => {
          onSelect(task);
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
        <Title level={5}>{task.title}</Title>
      </Card>
    </>
  );
}

export default Task;
