import { Form, message, Modal } from 'antd';
import Title from 'antd/es/typography/Title';
import { useCreateTask } from '../../api/hooks/tasks/queries';
import FormTask from '../FormTask/FormTask';
import { useQueryClient } from '@tanstack/react-query';
import { CreateTask } from '../../api/endpoints/tasks/tasks.types';

interface CreateTaskModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

function CreateTaskModal({ isOpen, handleClose }: CreateTaskModalProps) {
  const [form] = Form.useForm();
  const { mutate: createTaskMutation, isPending: isLoading } = useCreateTask();
  const queryClient = useQueryClient();

  const handleSubmit = async (preparedValues: CreateTask) => {
    createTaskMutation(preparedValues, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['tasks'] });
        handleClose();
        form.resetFields();
      },
      onError: () => {
        message.error('Ошибка при создании задачи');
      },
    });
  };

  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      key={String(isOpen)}
    >
      <Title level={5} className='mb-4!'>
        Создание задачи
      </Title>
      <FormTask
        initialData={null}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </Modal>
  );
}

export default CreateTaskModal;
