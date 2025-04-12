import { LoadingOutlined } from '@ant-design/icons';
import { Alert, Badge, Button, Card, Flex, Space, Spin } from 'antd';
import { useBoards } from '../../api/hooks/boards/queries';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router';

const BoardsPage = () => {
  const { data: boards, isLoading, error } = useBoards();
  const navigate = useNavigate();

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
      <Flex vertical gap='middle'>
        <Badge color='blue' count={boards?.data.length}>
          <Title level={3}>Проекты</Title>
        </Badge>
        <Space direction='vertical' className='w-[50%]'>
          {boards &&
            boards.data.map((board) => (
              <Card key={board.id}>
                <Flex justify='space-between'>
                  <Title level={4}>{board.name}</Title>
                  <Button
                    type='link'
                    onClick={() => navigate(`/board/${board.id}`)}
                  >
                    Перейти к доске
                  </Button>
                </Flex>
              </Card>
            ))}
        </Space>
      </Flex>
    </Card>
  );
};

export default BoardsPage;
