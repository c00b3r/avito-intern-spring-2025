import { fireEvent, waitFor, screen } from '@testing-library/react';
import { message } from 'antd';
import CreateTaskModal from '../../component/ModalTask/CreateTaskModal';
import { CreateTask } from '../../api/endpoints/tasks/tasks.types';
import { TaskPriority } from '../../types/enum';
import { MessageType } from 'antd/es/message/interface';
import { renderWithProviders } from '../test-utils';

vi.mock('../../component/FormTask/FormTask', () => ({
  default: ({
    handleSubmit,
    isLoading,
  }: {
    handleSubmit: (data: CreateTask) => void;
    isLoading: boolean;
  }) => (
    <div data-testid='form-task'>
      <button
        onClick={() =>
          handleSubmit({
            title: 'Новая задача',
            assigneeId: 0,
            boardId: 0,
            description: '',
            priority: TaskPriority.Low,
          })
        }
        disabled={isLoading}
      >
        Создать
      </button>
    </div>
  ),
}));

const mutateMock = vi.fn();
vi.mock('@/api/hooks/tasks/queries', () => ({
  useCreateTask: () => ({
    mutate: mutateMock,
    isPending: false,
  }),
}));
vi.spyOn(message, 'error').mockImplementation(
  () => null as unknown as MessageType
);

describe('CreateTaskModal', () => {
  const handleClose = vi.fn();

  beforeEach(() => {
    mutateMock.mockReset();
    handleClose.mockReset();
  });

  it('renders modal and form', () => {
    renderWithProviders(
      <CreateTaskModal isOpen={true} handleClose={handleClose} />
    );
    expect(screen.getByText(/создание задачи/i)).toBeInTheDocument();
    expect(screen.getByTestId('form-task')).toBeInTheDocument();
  });

  it('shows error on mutation failure', async () => {
    mutateMock.mockImplementation(
      (_data, { onError }: { onError: () => void }) => {
        onError();
      }
    );

    renderWithProviders(
      <CreateTaskModal isOpen={true} handleClose={handleClose} />
    );

    fireEvent.click(screen.getByText(/Создать/i));

    await waitFor(() => {
      expect(message.error).toHaveBeenCalledWith('Ошибка при создании задачи');
    });
  });
});
