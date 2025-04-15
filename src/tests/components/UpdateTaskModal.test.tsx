import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import UpdateTaskModal from '../../component/ModalTask/UpdateTaskModal';
import { TaskPriority, TaskStatus } from '../../types/enum';
import { renderWithProviders } from '../test-utils';
import { Task, UpdateTask } from '../../api/endpoints/tasks/tasks.types';
import { BoardTask } from '../../api/endpoints/boards/boards.types';

const mutateMock = vi.fn();

vi.mock('../../component/FormTask/FormTask', () => ({
  default: ({
    handleSubmit,
    isLoading,
  }: {
    handleSubmit: (data: UpdateTask) => void;
    isLoading: boolean;
  }) => (
    <div data-testid='form-task'>
      <button
        onClick={() =>
          handleSubmit({
            title: 'Обновлённая задача',
            description: 'Новое описание',
            assigneeId: 1,
            boardId: 2,
            priority: TaskPriority.Medium,
            status: TaskStatus.Done,
          })
        }
        disabled={isLoading}
      >
        Обновить
      </button>
    </div>
  ),
}));

describe('UpdateTaskModal', () => {
  const handleClose = vi.fn();
  const task = {
    id: 1,
    title: 'Старая задача',
    description: 'Описание',
    priority: TaskPriority.Low,
    status: TaskStatus.Done,
    assignee: { id: 1, name: 'User' },
    boardId: 2,
  };

  beforeEach(() => {
    mutateMock.mockReset();
    handleClose.mockReset();
  });

  it('should be render', () => {
    renderWithProviders(
      <UpdateTaskModal
        isOpen={true}
        handleClose={handleClose}
        task={task as unknown as Task | BoardTask}
        boardId={2}
        fromBoard={false}
      />
    );

    expect(screen.getByText(/редактирование задачи/i)).toBeInTheDocument();
    expect(screen.getByTestId('form-task')).toBeInTheDocument();
  });
});
