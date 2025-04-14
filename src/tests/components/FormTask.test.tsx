import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import FormTask from '../../component/FormTask/FormTask';
import { CreateTask } from '../../api/endpoints/tasks/tasks.types';
import { renderWithProviders } from '../test-utils';

vi.mock('../../api/hooks/boards/queries', () => ({
  useBoards: () => ({
    data: {
      data: [
        { id: 1, name: 'Проект 1' },
        { id: 2, name: 'Проект 2' },
      ],
    },
  }),
}));

vi.mock('../../api/hooks/users/queries', () => ({
  useUsers: () => ({
    data: {
      data: [
        { id: 1, name: 'Пользователь 1' },
        { id: 2, name: 'Пользователь 2' },
      ],
    },
  }),
}));

describe('FormTask', () => {
  it('renders form fields correctly', () => {
    const mockSubmit = vi.fn();

    renderWithProviders(
      <FormTask<CreateTask>
        initialData={null}
        handleSubmit={mockSubmit}
        isLoading={false}
      />
    );

    expect(screen.getByPlaceholderText(/название/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/описание/i)).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /сохранить/i })
    ).toBeInTheDocument();
  });

  it('calls handleSubmit when form is submitted', () => {
    const mockSubmit = vi.fn();

    renderWithProviders(
      <FormTask<CreateTask>
        initialData={null}
        handleSubmit={mockSubmit}
        isLoading={false}
      />
    );

    fireEvent.change(screen.getByPlaceholderText(/название/i), {
      target: { value: 'Тестовая задача' },
    });

    fireEvent.click(screen.getByRole('button', { name: /сохранить/i }));

    expect(mockSubmit).toHaveBeenCalled();
  });
});
