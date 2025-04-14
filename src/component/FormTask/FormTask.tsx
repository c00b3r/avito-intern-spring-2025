import { Input, Select, Flex, Avatar, Button, Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { TaskPriority, TaskStatus } from '../../types/enum';
import { useNavigate } from 'react-router';
import { useBoards } from '../../api/hooks/boards/queries';
import { useUsers } from '../../api/hooks/users/queries';
import { CreateTask, UpdateTask } from '../../api/endpoints/tasks/tasks.types';

interface FormTaskProps<T extends CreateTask | UpdateTask> {
  initialData: T | null;
  handleSubmit: (values: T) => void;
  isLoading: boolean;
}

function FormTask<T extends CreateTask>({
  initialData,
  handleSubmit,
  isLoading,
}: FormTaskProps<T>) {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { data: boards } = useBoards();
  const { data: users } = useUsers();

  const handleSubmitForm = async (values: T) => {
    handleSubmit(values);
  };

  return (
    <>
      <Form
        form={form}
        layout='vertical'
        initialValues={initialData || undefined}
        onFinish={handleSubmitForm}
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
          name='boardId'
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
          name='assigneeId'
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
            disabled={!('boardId' in (initialData || {}))}
            onClick={() =>
              navigate(`/board/${(initialData as CreateTask)?.boardId}`)
            }
          >
            Перейти к проекту
          </Button>
          <Form.Item>
            <Button type='primary' htmlType='submit' loading={isLoading}>
              {initialData === null ? 'Создать' : 'Обновить'}
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </>
  );
}

export default FormTask;
