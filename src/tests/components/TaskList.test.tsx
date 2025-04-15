import { render, fireEvent, screen } from '@testing-library/react';
import { vi } from 'vitest';
import TaskList from '../../component/TaskList/TaskList';
import { Task } from '../../api/endpoints/tasks/tasks.types';
import { TaskStatus, TaskPriority } from '../../types/enum';

describe('TaskList', () => {
  const mockTasks: Task[] = [
    {
      id: 1,
      title: 'Задача 1',
      description: 'Описание задачи 1',
      status: TaskStatus.Backlog,
      priority: TaskPriority.Medium,
      assignee: {
        id: 1,
        fullName: 'Александр Васильев',
        email: 'alex@example.com',
        avatarUrl: 'https://example.com/avatar1.jpg',
      },
      boardId: 1,
      boardName: '',
    },
    {
      id: 2,
      title: 'Задача 2',
      description: 'Описание задачи 2',
      status: TaskStatus.InProgress,
      priority: TaskPriority.High,
      assignee: {
        id: 2,
        fullName: 'Александр Васильев',
        email: 'alex@example.com',
        avatarUrl: 'https://example.com/avatar2.jpg',
      },
      boardId: 1,
      boardName: '',
    },
    {
      id: 3,
      title: 'Задача 3',
      description: 'Описание задачи 3',
      status: TaskStatus.Done,
      priority: TaskPriority.Low,
      assignee: {
        id: 3,
        fullName: 'Александр Васильев',
        email: 'alex@example.com',
        avatarUrl: 'https://example.com/avatar3.jpg',
      },
      boardId: 1,
      boardName: '',
    },
    {
      id: 4,
      title: 'Задача 4',
      description: 'Описание задачи 4',
      status: TaskStatus.Backlog,
      priority: TaskPriority.Medium,
      assignee: {
        id: 1,
        fullName: 'Александр Васильев',
        email: 'alex@example.com',
        avatarUrl: 'https://example.com/avatar1.jpg',
      },
      boardId: 1,
      boardName: '',
    },
    {
      id: 5,
      title: 'Задача 5',
      description: 'Описание задачи 5',
      status: TaskStatus.InProgress,
      priority: TaskPriority.High,
      assignee: {
        id: 2,
        fullName: 'Петр Петров',
        email: 'petr@example.com',
        avatarUrl: 'https://example.com/avatar2.jpg',
      },
      boardId: 1,
      boardName: '',
    },
    {
      id: 6,
      title: 'Задача 6',
      description: 'Описание задачи 6',
      status: TaskStatus.Done,
      priority: TaskPriority.Low,
      assignee: {
        id: 3,
        fullName: 'Анна Сидорова',
        email: 'anna@example.com',
        avatarUrl: 'https://example.com/avatar3.jpg',
      },
      boardId: 1,
      boardName: '',
    },
  ];

  const mockOnTaskClick = vi.fn();

  beforeEach(() => {
    mockOnTaskClick.mockReset();
  });

  it('renders empty when no tasks', () => {
    render(<TaskList tasks={[]} onTaskClick={mockOnTaskClick} />);

    expect(screen.getByText('Нет задач')).toBeInTheDocument();
  });

  it('renders list of tasks', () => {
    render(<TaskList tasks={mockTasks} onTaskClick={mockOnTaskClick} />);

    expect(screen.getByText('Задача 1')).toBeInTheDocument();
    expect(screen.getByText('Задача 2')).toBeInTheDocument();
    expect(screen.getByText('Задача 3')).toBeInTheDocument();
  });

  it('renders pagination', () => {
    render(<TaskList tasks={mockTasks} onTaskClick={mockOnTaskClick} />);

    expect(screen.getByText('1-5 из 6 задач')).toBeInTheDocument();
  });

  it('calls onTaskClick when task clicked', () => {
    render(<TaskList tasks={mockTasks} onTaskClick={mockOnTaskClick} />);

    const taskCard = screen.getByText('Задача 1').closest('.ant-card');
    fireEvent.click(taskCard!);

    expect(mockOnTaskClick).toHaveBeenCalledWith(mockTasks[0]);
  });

  it('renders correct task status and priority', () => {
    render(<TaskList tasks={mockTasks} onTaskClick={mockOnTaskClick} />);

    const backlogTags = screen.getAllByText('Бэклог');
    expect(backlogTags.length).toBeGreaterThan(0);

    const inProgressTags = screen.getAllByText('В процессе');
    expect(inProgressTags.length).toBeGreaterThan(0);

    const doneTags = screen.getAllByText('Выполнено');
    expect(doneTags.length).toBeGreaterThan(0);

    const mediumTags = screen.getAllByText('Средний');
    expect(mediumTags.length).toBeGreaterThan(0);

    const highTags = screen.getAllByText('Высокий');
    expect(highTags.length).toBeGreaterThan(0);

    const lowTags = screen.getAllByText('Низкий');
    expect(lowTags.length).toBeGreaterThan(0);
  });
});
