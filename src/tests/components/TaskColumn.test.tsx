import { render, fireEvent, screen } from '@testing-library/react';
import { vi } from 'vitest';
import TaskColumn from '../../component/TaskColumn/TaskColumn';
import { BoardTask } from '../../api/endpoints/boards/boards.types';
import { TaskPriority, TaskStatus } from '../../types/enum';

describe('TaskColumn', () => {
  const mockTasks: BoardTask[] = [
    {
      id: 1,
      title: 'Задача 1',
      description: 'Описание 1',
      priority: TaskPriority.Medium,
      status: TaskStatus.InProgress,
      assignee: {
        id: 1,
        fullName: 'Александр Васильев',
        email: 'alex@example.com',
        avatarUrl: 'https://example.com/avatar1.jpg',
      },
    },
    {
      id: 2,
      title: 'Задача 2',
      description: 'Описание 2',
      priority: TaskPriority.High,
      status: TaskStatus.InProgress,
      assignee: {
        id: 2,
        fullName: 'Александр Васильев',
        email: 'alex@example.com',
        avatarUrl: 'https://example.com/avatar2.jpg',
      },
    },
  ];

  const mockOnTaskClick = vi.fn();
  const mockOnDrop = vi.fn();
  const mockOnDragStart = vi.fn();

  beforeEach(() => {
    mockOnTaskClick.mockReset();
    mockOnDrop.mockReset();
    mockOnDragStart.mockReset();
  });

  it('renders column title', () => {
    render(
      <TaskColumn
        title='Test Column'
        tasks={mockTasks}
        onTaskClick={mockOnTaskClick}
        onDrop={mockOnDrop}
        onDragStart={mockOnDragStart}
      />
    );

    expect(screen.getByText('Test Column')).toBeInTheDocument();
  });

  it('renders all tasks in the column', () => {
    render(
      <TaskColumn
        title='Test Column'
        tasks={mockTasks}
        onTaskClick={mockOnTaskClick}
        onDrop={mockOnDrop}
        onDragStart={mockOnDragStart}
      />
    );

    expect(screen.getByText('Задача 1')).toBeInTheDocument();
    expect(screen.getByText('Задача 2')).toBeInTheDocument();
  });

  it('handle onDragOver when a task dragged over', () => {
    render(
      <TaskColumn
        title='Test Column'
        tasks={mockTasks}
        onTaskClick={mockOnTaskClick}
        onDrop={mockOnDrop}
        onDragStart={mockOnDragStart}
      />
    );

    const card = screen.getByText('Test Column').closest('.ant-card');
    if (card) {
      fireEvent.dragOver(card);
    }
  });

  it('handle onDrop when a task is dropped', () => {
    render(
      <TaskColumn
        title='Test Column'
        tasks={mockTasks}
        onTaskClick={mockOnTaskClick}
        onDrop={mockOnDrop}
        onDragStart={mockOnDragStart}
      />
    );

    const card = screen.getByText('Test Column').closest('.ant-card');
    if (card) {
      fireEvent.dragOver(card);

      fireEvent.drop(card);

      expect(mockOnDrop).toHaveBeenCalled();
    }
  });

  it('handle onTaskClick when a task is clicked', () => {
    render(
      <TaskColumn
        title='Test Column'
        tasks={mockTasks}
        onTaskClick={mockOnTaskClick}
        onDrop={mockOnDrop}
        onDragStart={mockOnDragStart}
      />
    );

    fireEvent.click(screen.getByText('Задача 1'));
    expect(mockOnTaskClick).toHaveBeenCalledWith(mockTasks[0]);
  });

  it('handle onDragStart when a task is dragged', () => {
    render(
      <TaskColumn
        title='Test Column'
        tasks={mockTasks}
        onTaskClick={mockOnTaskClick}
        onDrop={mockOnDrop}
        onDragStart={mockOnDragStart}
      />
    );

    const taskCard = screen.getByText('Задача 1').closest('.ant-card');
    if (taskCard) {
      fireEvent.dragStart(taskCard);
      expect(mockOnDragStart).toHaveBeenCalledWith(mockTasks[0]);
    }
  });
});
