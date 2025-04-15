import { render, fireEvent, screen } from '@testing-library/react';
import Header from '../../component/Header/Header';
import { MemoryRouter } from 'react-router';

vi.mock('../../component/ModalTask/CreateTaskModal', () => ({
  default: ({
    isOpen,
    handleClose,
  }: {
    isOpen: boolean;
    handleClose: () => void;
  }) =>
    isOpen ? (
      <div data-testid='modal'>
        <button onClick={handleClose}>Закрыть</button>
      </div>
    ) : null,
}));

describe('Header', () => {
  it('renders navigation buttons', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('button', { name: /все задачи/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /проекты/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /создать задачу/i })
    ).toBeInTheDocument();
  });

  it('opens modal on "Создать задачу" click', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /создать задачу/i }));
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

  it('closes modal on close button click', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /создать задачу/i }));
    expect(screen.getByTestId('modal')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Закрыть'));
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });
});
