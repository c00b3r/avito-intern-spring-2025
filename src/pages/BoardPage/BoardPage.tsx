import { useParams } from 'react-router';
import { useBoards } from '../../api/hooks/boards/queries';
import { Alert, Card, Flex, Space, Spin } from 'antd';
import Title from 'antd/es/typography/Title';
import { LoadingOutlined } from '@ant-design/icons';
import useTasksByStatus from '../../hooks/useTasksByStatus';

function BoardPage() {
  const { id = '' } = useParams();
  const { data: boards } = useBoards();
  const { backlogTasks, inProgressTasks, doneTasks, error, isLoading } =
    useTasksByStatus(id);

  const boardTitle = boards?.data.find((b) => String(b.id) === id)?.name;

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
    <Card>
      <Title level={3}>{boardTitle}</Title>
      <Flex gap='small' justify='space-between'>
        <Card title='Бэклог' className='w-1/3'>
          <Space direction='vertical' className='w-full'>
            {backlogTasks?.map((task) => (
              <Card key={task.id} hoverable draggable className='w-[100%]'>
                {task.title}
              </Card>
            ))}
          </Space>
        </Card>
        <Card title='В процессе' className='w-1/3'>
          <Space direction='vertical' className='w-full'>
            {inProgressTasks?.map((task) => (
              <Card key={task.id} hoverable draggable>
                {task.title}
              </Card>
            ))}
          </Space>
        </Card>
        <Card title='Выполнено' className='w-1/3'>
          <Space direction='vertical' className='w-full'>
            {doneTasks?.map((task) => (
              <Card key={task.id} hoverable draggable>
                {task.title}
              </Card>
            ))}
          </Space>
        </Card>
      </Flex>
    </Card>
  );
}

export default BoardPage;
