import { Form, message, Modal } from 'antd';
import { useUpdateTask } from '../../api/hooks/tasks/queries';
import Title from 'antd/es/typography/Title';
import FormTask from '../FormTask/FormTask';
import { Task, UpdateTask } from '../../api/endpoints/tasks/tasks.types';
import { useQueryClient } from '@tanstack/react-query';
import { BoardTask } from '../../api/endpoints/boards/boards.types';

interface UpdateTaskModalProps {
  isOpen: boolean;
  handleClose: () => void;
  task: Task | BoardTask;
  boardId?: number;
  fromBoard?: boolean;
}

function UpdateTaskModal({
  isOpen,
  handleClose,
  task,
  boardId,
  fromBoard,
}: UpdateTaskModalProps) {
  const [form] = Form.useForm();
  const { mutate: updateTaskMutation, isPending: isUpdating } = useUpdateTask();
  const queryClient = useQueryClient();

  const handleSubmit = async (values: UpdateTask) => {
    updateTaskMutation(
      {
        taskId: task.id,
        newTask: values,
      },
      {
        onSuccess: () => {
          message.success('Задача успешно обновлена');
          queryClient.invalidateQueries({ queryKey: ['tasks'] });
          queryClient.invalidateQueries({ queryKey: ['task', task?.id] });
          queryClient.invalidateQueries({ queryKey: ['board', boardId] });

          form.resetFields();
          handleClose();
        },
        onError: () => {
          message.error('Ошибка при обновлении задачи');
        },
      }
    );
  };
  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      key={String(isOpen) + task?.id}
    >
      <Title level={5} className='mb-4!'>
        Редактирование задачи
      </Title>
      <FormTask<UpdateTask>
        initialData={{
          assigneeId: task.assignee.id,
          description: task.description,
          priority: task.priority,
          status: task.status,
          title: task.title,
          boardId: boardId || ('boardId' in task ? task.boardId : 0),
        }}
        handleSubmit={handleSubmit}
        isLoading={isUpdating}
        fromBoard={fromBoard}
      />
    </Modal>
  );
}

export default UpdateTaskModal;
