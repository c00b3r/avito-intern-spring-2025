import {
  Alert,
  Badge,
  Button,
  Card,
  Cascader,
  Flex,
  Input,
  Space,
  Spin,
  Tag,
} from 'antd';
import { useTasks } from '../../api/hooks/tasks/queries';
import { LoadingOutlined } from '@ant-design/icons';
import { TaskStatus } from '../../types/enum';
import Title from 'antd/es/typography/Title';

const statusColors = {
  [TaskStatus.Backlog]: 'blue',
  [TaskStatus.InProgress]: 'gold',
  [TaskStatus.Done]: 'green',
};

const statusName = {
  [TaskStatus.Backlog]: 'Бэклог',
  [TaskStatus.InProgress]: 'В процессе',
  [TaskStatus.Done]: 'Выполнено',
};

function IssuesPage() {
  const { data: tasks, error, isLoading } = useTasks();

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
      <Space direction='vertical' className='w-full'>
        <Flex justify='space-between'>
          <Badge color='blue' count={tasks?.data.length}>
            <Title level={3}>Задачи</Title>
          </Badge>
          <Flex gap='middle'>
            <Input placeholder='Поиск' className='h-[32px]' />
            <Cascader className='h-[32px]' />
            <Button type='primary'>Добавить задачу</Button>
          </Flex>
        </Flex>
        {tasks &&
          tasks.data.map((task) => (
            <Card key={task.id} hoverable className='w-full'>
              <Tag color={statusColors[task.status]}>
                {statusName[task.status]}
              </Tag>
              <Title level={5}>{task.title}</Title>
            </Card>
          ))}
      </Space>
    </Card>
  );
}

export default IssuesPage;
