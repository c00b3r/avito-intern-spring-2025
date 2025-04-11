import { LoadingOutlined } from '@ant-design/icons';
import { Alert, Card, Space, Spin } from 'antd';
import { useBoards } from '../../api/hooks/boards/queries';
import Title from 'antd/es/typography/Title';

const BoardsPage = () => {
  const { data: boards, isLoading, error } = useBoards();

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
        <Alert message='Ошибка загрузки проектов' type='error' showIcon />
      </div>
    );
  }

  return (
    <Card>
      <Space direction='vertical' className='w-full'>
        {boards &&
          boards.data.map((board) => (
            <Card key={board.id} hoverable>
              <Title level={4}>{board.name}</Title>
            </Card>
          ))}
      </Space>
    </Card>
  );
};

export default BoardsPage;
