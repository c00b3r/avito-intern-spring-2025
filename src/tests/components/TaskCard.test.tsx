import { render, fireEvent, screen } from '@testing-library/react';
import { vi } from 'vitest';
import TaskCard from '../../component/TaskCard/TaskCard';
import { BoardTask } from '../../api/endpoints/boards/boards.types';
import { TaskPriority, TaskStatus } from '../../types/enum';

describe('TaskCard', () => {
  const mockTask: BoardTask = {
    id: 1,
    title: 'Задача 1',
    description: 'Описание 1',
    priority: TaskPriority.Medium,
    status: TaskStatus.InProgress,
    assignee: {
      id: 1,
      fullName: 'Александр Васильев',
      email: 'alex@example.com',
      avatarUrl: 'https://example.com/avatar.jpg',
    },
  };

  const mockOnClick = vi.fn();
  const mockOnDragStart = vi.fn();

  beforeEach(() => {
    mockOnClick.mockReset();
    mockOnDragStart.mockReset();
  });

  it('renders task title', () => {
    render(
      <TaskCard
        task={mockTask}
        onClick={mockOnClick}
        onDragStart={mockOnDragStart}
      />
    );

    expect(screen.getByText('Задача 1')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    render(
      <TaskCard
        task={mockTask}
        onClick={mockOnClick}
        onDragStart={mockOnDragStart}
      />
    );

    fireEvent.click(screen.getByText('Задача 1'));

    expect(mockOnClick).toHaveBeenCalledWith(mockTask);
  });

  it('calls onDragStart when drag starts', () => {
    render(
      <TaskCard
        task={mockTask}
        onClick={mockOnClick}
        onDragStart={mockOnDragStart}
      />
    );

    const card = screen.getByText('Задача 1').closest('.ant-card');
    if (card) {
      fireEvent.dragStart(card);
    }

    expect(mockOnDragStart).toHaveBeenCalledWith(mockTask);
  });

  it('sets drag data when drag starts', () => {
    render(
      <TaskCard
        task={mockTask}
        onClick={mockOnClick}
        onDragStart={mockOnDragStart}
      />
    );

    const card = screen.getByText('Задача 1').closest('.ant-card');
    if (card) {
      const dragStartEvent = fireEvent.dragStart(card);
      expect(dragStartEvent).toBe(true);
    }
  });
});
