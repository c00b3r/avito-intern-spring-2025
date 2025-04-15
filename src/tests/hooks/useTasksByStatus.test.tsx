import { renderHook } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import useTasksByStatus from '../../hooks/useTasksByStatus';
import { useBoard } from '../../api/hooks/boards/queries';
import { TaskStatus } from '../../types/enum';

vi.mock('../../api/hooks/boards/queries', () => ({
  useBoard: vi.fn(),
}));

describe('useTasksByStatus', () => {
  const mockBoardId = 1;

  const mockTasks = [
    {
      id: 3,
      title: 'Задача 3',
      description: 'Описание задачи 3',
      status: TaskStatus.Done,
      priority: 'Low',
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
      id: 1,
      title: 'Задача 1',
      description: 'Описание задачи 1',
      status: TaskStatus.Backlog,
      priority: 'Medium',
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
      priority: 'High',
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
      id: 4,
      title: 'Задача 4',
      description: 'Описание задачи 4',
      status: TaskStatus.Backlog,
      priority: 'Medium',
      assignee: {
        id: 1,
        fullName: 'Александр Васильев',
        email: 'alex@example.com',
        avatarUrl: 'https://example.com/avatar1.jpg',
      },
      boardId: 1,
      boardName: '',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns filtered tasks by status', () => {
    (useBoard as Mock).mockReturnValue({
      data: { data: mockTasks },
      error: null,
      isLoading: false,
    });

    const { result } = renderHook(() => useTasksByStatus(mockBoardId));

    expect(result.current?.backlogTasks).toHaveLength(2);
    expect(result.current?.backlogTasks?.[0].id).toBe(1);
    expect(result.current?.backlogTasks?.[1].id).toBe(4);

    expect(result.current?.inProgressTasks).toHaveLength(1);
    expect(result.current?.inProgressTasks?.[0].id).toBe(2);

    expect(result.current?.doneTasks).toHaveLength(1);
    expect(result.current?.doneTasks?.[0].id).toBe(3);

    expect(useBoard).toHaveBeenCalledWith(mockBoardId);
  });

  it('returns empty arrays when no tasks', () => {
    (useBoard as Mock).mockReturnValue({
      data: { data: [] },
      error: null,
      isLoading: false,
    });

    const { result } = renderHook(() => useTasksByStatus(mockBoardId));

    expect(result.current.backlogTasks).toHaveLength(0);
    expect(result.current.inProgressTasks).toHaveLength(0);
    expect(result.current.doneTasks).toHaveLength(0);
  });

  it('returns undefined arrays when data is undefined', () => {
    (useBoard as Mock).mockReturnValue({
      data: undefined,
      error: null,
      isLoading: false,
    });

    const { result } = renderHook(() => useTasksByStatus(mockBoardId));

    expect(result.current.backlogTasks).toBeUndefined();
    expect(result.current.inProgressTasks).toBeUndefined();
    expect(result.current.doneTasks).toBeUndefined();
  });

  it('returns error and isLoading from useBoard', () => {
    const mockError = new Error('Test error');

    (useBoard as Mock).mockReturnValue({
      data: { data: mockTasks },
      error: mockError,
      isLoading: true,
    });

    const { result } = renderHook(() => useTasksByStatus(mockBoardId));

    expect(result.current.error).toBe(mockError);
    expect(result.current.isLoading).toBe(true);
  });
});
