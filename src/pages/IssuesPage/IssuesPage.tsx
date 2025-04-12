import {
  Alert,
  Badge,
  Button,
  Card,
  Cascader,
  Empty,
  Flex,
  Input,
  Space,
  Spin,
  Tag,
} from 'antd';
import { useTasks } from '../../api/hooks/tasks/queries';
import {
  CarryOutOutlined,
  FundProjectionScreenOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import {
  statusColors,
  statusName,
  priorityColors,
  priorityName,
} from '../../const/issue';

function IssuesPage() {
  const { data: tasks, error, isLoading } = useTasks();
  const tasksData = tasks?.data || null;

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
          <Badge color='blue' count={tasksData?.length || 0}>
            <Title level={3}>Задачи</Title>
          </Badge>
          <Flex gap='middle'>
            <Input placeholder='Поиск' className='h-[32px]' />
            <Cascader className='h-[32px]' />
            <Button type='primary'>Добавить задачу</Button>
          </Flex>
        </Flex>
        <Flex vertical className='h-[75vh] overflow-y-auto p-4!' gap='small'>
          {tasksData ? (
            tasksData.map((task) => (
              <Card key={task.id} hoverable className='w-full'>
                <Tag
                  color={statusColors[task.status]}
                  icon={<CarryOutOutlined />}
                >
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
            ))
          ) : (
            <Empty description='Нет задач' />
          )}
        </Flex>
      </Space>
    </Card>
  );
}

export default IssuesPage;
