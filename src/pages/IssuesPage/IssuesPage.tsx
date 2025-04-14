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
import { useState } from 'react';
import CreateTaskModal from '../../component/ModalTask/CreateTaskModal';
import UpdateTaskModal from '../../component/ModalTask/UpdateTaskModal';
import TaskItem from '../../component/TaskItem/TaskItem';
import { Task } from '../../api/endpoints/tasks/tasks.types';

function IssuesPage() {
  const { data: tasks, error, isLoading } = useTasks();
  const tasksData = tasks?.data || null;
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

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
      <Space direction='vertical' className='w-full' size={0}>
        {isModalCreateOpen && (
          <CreateTaskModal
            isOpen={isModalCreateOpen}
            handleClose={() => setIsModalCreateOpen(false)}
          />
        )}
        {selectedTask && (
          <UpdateTaskModal
            isOpen={isModalUpdateOpen}
            handleClose={() => setIsModalUpdateOpen(false)}
            task={selectedTask}
          />
        )}
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
                setIsModalCreateOpen(true);
              }}
            >
              Добавить задачу
            </Button>
          </Flex>
        </Flex>
        <Flex
          vertical
          className='h-[75vh] overflow-y-auto p-[2px]!'
          gap='small'
        >
          {tasksData ? (
            <List
              dataSource={tasksData}
              loading={isLoading}
              renderItem={(task) => (
                <TaskItem
                  task={task}
                  // onSelect={() => console.log}
                  setOpenModal={() => {
                    setIsModalUpdateOpen(true);
                    setSelectedTask(task);
                  }}
                />
              )}
              pagination={{
                position: 'bottom',
                align: 'center',
                pageSize: 5,
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
      </Space>
    </Card>
  );
}

export default IssuesPage;
