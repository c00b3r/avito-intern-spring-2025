import { Modal, Form, Input, Select, Button, Flex, Avatar } from 'antd';
import { Task } from '../../api/endpoints/tasks/tasks.types';
import TextArea from 'antd/es/input/TextArea';
import Title from 'antd/es/typography/Title';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { TaskPriority, TaskStatus } from '../../types/enum';
import { useBoards } from '../../api/hooks/boards/queries';
import { useUsers } from '../../api/hooks/users/queries';

interface ModalTaskProps {
  mode: 'create' | 'edit';
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  initialData?: Task;
}

function ModalTask({ mode, isOpen, setIsOpen, initialData }: ModalTaskProps) {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { data: boards } = useBoards();
  const { data: users } = useUsers();

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      form.resetFields();
      if (initialData) {
        form.setFieldsValue({
          ...initialData,
          assignee: initialData.assignee.id,
        });
      } else {
        form.setFieldsValue({
          title: null,
          description: null,
          boardName: null,
          priority: null,
          status: null,
          assignee: null,
        });
      }
    }
  }, [isOpen, initialData, form]);

  const handleSubmit = (values: Task) => {
    console.log(values);
  };

  return (
    <Modal open={isOpen} onCancel={handleClose} footer={null}>
      <Title level={5} className='mb-4!'>
        {mode === 'create' ? 'Создание задачи' : 'Редактирование задачи'}
      </Title>
      <Form
        form={form}
        layout='vertical'
        initialValues={initialData}
        onFinish={handleSubmit}
      >
        <Form.Item
          name='title'
          rules={[{ required: true, message: 'Введите название задачи' }]}
        >
          <Input placeholder='Название задачи' />
        </Form.Item>
        <Form.Item
          name='description'
          rules={[{ required: true, message: 'Введите описание задачи' }]}
        >
          <TextArea
            placeholder='Описание задачи'
            autoSize={{ minRows: 4, maxRows: 6 }}
          />
        </Form.Item>
        <Form.Item
          name='boardName'
          rules={[{ required: true, message: 'Выберите проект' }]}
        >
          <Select placeholder='Выберите проект'>
            {boards?.data.map((board) => (
              <Select.Option value={board.id}>{board.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name='priority'
          rules={[{ required: true, message: 'Выберите приоритет' }]}
        >
          <Select placeholder='Выберите приоритет'>
            <Select.Option value={TaskPriority.Low}>Низкий</Select.Option>
            <Select.Option value={TaskPriority.Medium}>Средний</Select.Option>
            <Select.Option value={TaskPriority.High}>Высокий</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name='status'
          rules={[{ required: true, message: 'Выберите статус' }]}
        >
          <Select placeholder='Статус задачи'>
            <Select.Option value={TaskStatus.Backlog}>Бэклог</Select.Option>
            <Select.Option value={TaskStatus.InProgress}>
              В процессе
            </Select.Option>
            <Select.Option value={TaskStatus.Done}>Выполнено</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name='assignee'
          rules={[{ required: true, message: 'Выберите исполнителя' }]}
        >
          <Select placeholder='Выберите исполнителя'>
            {users?.data.map((user) => (
              <Select.Option value={user.id} key={user.id}>
                <Flex align='center' gap='small'>
                  <Avatar src={user.avatarUrl} size={24} />
                  {user.fullName}
                </Flex>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Flex justify='space-between' gap='middle'>
          <Button
            disabled={mode === 'create'}
            onClick={() => navigate(`/board/${initialData?.boardId}`)}
          >
            Перейти к проекту
          </Button>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              {mode === 'create' ? 'Создать' : 'Обновить'}
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </Modal>
  );
}

export default ModalTask;
