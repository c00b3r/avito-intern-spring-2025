import { render, fireEvent, screen } from '@testing-library/react';
import { vi } from 'vitest';
import TaskItem from '../../component/TaskItem/TaskItem';
import { BoardTask } from '../../api/endpoints/boards/boards.types';
import { TaskStatus, TaskPriority } from '../../types/enum';

describe('TaskItem', () => {
  const mockTask: BoardTask = {
    id: 1,
    title: 'Тестовая задача',
    description: 'Описание тестовой задачи',
    status: TaskStatus.Backlog,
    priority: TaskPriority.Medium,
    assignee: {
      id: 1,
      fullName: 'Александр Васильев',
      email: 'alex@example.com',
      avatarUrl: 'https://example.com/avatar.jpg',
    },
  };

  const mockSetOpenModal = vi.fn();

  beforeEach(() => {
    mockSetOpenModal.mockReset();
  });

  it('renders task title', () => {
    render(<TaskItem task={mockTask} setOpenModal={mockSetOpenModal} />);

    expect(screen.getByText('Тестовая задача')).toBeInTheDocument();
  });

  it('renders task status tag', () => {
    render(<TaskItem task={mockTask} setOpenModal={mockSetOpenModal} />);

    expect(screen.getByText('Бэклог')).toBeInTheDocument();
  });

  it('renders task priority tag', () => {
    render(<TaskItem task={mockTask} setOpenModal={mockSetOpenModal} />);

    expect(screen.getByText('Средний')).toBeInTheDocument();
  });

  it('setOpenModal when card is clicked', () => {
    render(<TaskItem task={mockTask} setOpenModal={mockSetOpenModal} />);

    const card = screen.getByText('Тестовая задача').closest('.ant-card');
    fireEvent.click(card!);

    expect(mockSetOpenModal).toHaveBeenCalledWith(true);
  });

  it('renders different status tags correctly', () => {
    const inProgressTask = {
      ...mockTask,
      status: TaskStatus.InProgress,
    };

    render(<TaskItem task={inProgressTask} setOpenModal={mockSetOpenModal} />);
    expect(screen.getByText('В процессе')).toBeInTheDocument();

    const doneTask = {
      ...mockTask,
      status: TaskStatus.Done,
    };

    render(<TaskItem task={doneTask} setOpenModal={mockSetOpenModal} />);
    expect(screen.getByText('Выполнено')).toBeInTheDocument();
  });

  it('renders different priority tags correctly', () => {
    const highPriorityTask = {
      ...mockTask,
      priority: TaskPriority.High,
    };

    render(
      <TaskItem task={highPriorityTask} setOpenModal={mockSetOpenModal} />
    );
    expect(screen.getByText('Высокий')).toBeInTheDocument();

    const lowPriorityTask = {
      ...mockTask,
      priority: TaskPriority.Low,
    };

    render(<TaskItem task={lowPriorityTask} setOpenModal={mockSetOpenModal} />);
    expect(screen.getByText('Низкий')).toBeInTheDocument();
  });
});
