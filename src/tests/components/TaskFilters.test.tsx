import { render, fireEvent, screen } from '@testing-library/react';
import { vi } from 'vitest';
import TaskFilters from '../../component/TaskFilters/TaskFilters';
import { Board } from '../../api/endpoints/boards/boards.types';
import { Filters } from '../../types/interface';

describe('TaskFilters', () => {
  const mockBoards: Board[] = [
    {
      id: 1,
      name: 'Проект 1',
      description: 'Описание 1',
      taskCount: 10,
    },
    {
      id: 2,
      name: 'Проект 2',
      description: 'Описание 2',
      taskCount: 10,
    },
  ];

  const mockFilters: Filters = {
    status: '',
    boardId: '',
    search: '',
  };

  const mockOnFilterChange = vi.fn();
  const mockOnCreateTask = vi.fn();

  beforeEach(() => {
    mockOnFilterChange.mockReset();
    mockOnCreateTask.mockReset();
  });

  it('renders title with total tasks count', () => {
    render(
      <TaskFilters
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
        boards={mockBoards}
        totalTasks={5}
        onCreateTask={mockOnCreateTask}
      />
    );

    expect(screen.getByText('Задачи')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('handles search input change', () => {
    render(
      <TaskFilters
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
        boards={mockBoards}
        totalTasks={5}
        onCreateTask={mockOnCreateTask}
      />
    );

    const searchInput = screen.getByPlaceholderText('Поиск');
    fireEvent.change(searchInput, { target: { value: 'test' } });

    expect(mockOnFilterChange).toHaveBeenCalledWith('search', 'test');
  });

  it('handles create task button click', () => {
    render(
      <TaskFilters
        filters={mockFilters}
        onFilterChange={mockOnFilterChange}
        boards={mockBoards}
        totalTasks={5}
        onCreateTask={mockOnCreateTask}
      />
    );

    const createButton = screen.getByText('Добавить задачу');
    fireEvent.click(createButton);

    expect(mockOnCreateTask).toHaveBeenCalled();
  });
});
