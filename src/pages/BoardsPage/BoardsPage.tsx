import { LoadingOutlined } from '@ant-design/icons';
import { Alert, Badge, Button, Card, Empty, Flex, Spin } from 'antd';
import { useBoards } from '../../api/hooks/boards/queries';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router';

const BoardsPage = () => {
  const { data: boards, isLoading, error } = useBoards();
  const boardsData = boards?.data || null;
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
        <Badge color='blue' count={boardsData?.length || 0}>
          <Title level={3}>Проекты</Title>
        </Badge>
        <Flex vertical gap={'small'} className='w-[50%] overflow-y-auto'>
          {boardsData ? (
            boardsData.map((board) => (
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
            ))
          ) : (
            <Empty description='Нет проектов' />
          )}
        </Flex>
      </Flex>
    </Card>
  );
};

export default BoardsPage;
