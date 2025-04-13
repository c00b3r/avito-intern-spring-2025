import {
  Alert,
  Badge,
  Button,
  Card,
  Cascader,
  Empty,
  Flex,
  Input,
  List,
  Space,
  Spin,
} from 'antd';
import { useTasks } from '../../api/hooks/tasks/queries';
import { LoadingOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import Task from '../../component/Task/Task';
import { useState } from 'react';
import ModalTask from '../../component/ModalTask/ModalTask';

function IssuesPage() {
  const { data: tasks, error, isLoading } = useTasks();
  const tasksData = tasks?.data || null;
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modeModal, setModeModal] = useState<'create' | 'edit'>('create');

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
            <Button
              type='primary'
              onClick={() => {
                setIsModalOpen(true);
                setModeModal('create');
              }}
            >
              Добавить задачу
            </Button>
          </Flex>
        </Flex>
        <Flex vertical className='h-[75vh] overflow-y-auto p-2!' gap='small'>
          {tasksData ? (
            <List
              dataSource={tasksData}
              renderItem={(task) => (
                <Task
                  task={task}
                  onSelect={setSelectedTask}
                  setOpenModal={setIsModalOpen}
                />
              )}
              pagination={{
                position: 'top',
                pageSize: 10,
                total: tasksData.length,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} из ${total} задач`,
                className: 'mb-2!',
              }}
            />
          ) : (
            <Empty description='Нет задач' />
          )}
        </Flex>
        <ModalTask
          mode={modeModal}
          isOpen={isModalOpen}
          setIsOpen={() => {
            setModeModal('edit');
            setIsModalOpen(false);
            setSelectedTask(null);
          }}
          initialData={selectedTask || undefined}
        />
      </Space>
    </Card>
  );
}

export default IssuesPage;
