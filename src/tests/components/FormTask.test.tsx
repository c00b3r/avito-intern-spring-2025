import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
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

    expect(screen.getByPlaceholderText(/Название/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Описание/i)).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /Создать/i })
    ).toBeInTheDocument();
  });
});
