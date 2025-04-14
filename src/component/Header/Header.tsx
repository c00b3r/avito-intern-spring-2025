import { Button } from 'antd';
import { NavLink } from 'react-router';
import { useState } from 'react';
import CreateTaskModal from '../ModalTask/CreateTaskModal';

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='p-3 flex gap-2 bg-white rounded-xl shadow-sm'>
      <NavLink to='/issues'>
        <Button>Все задачи</Button>
      </NavLink>
      <NavLink to='/boards'>
        <Button>Проекты</Button>
      </NavLink>
      <Button
        type='primary'
        className='ml-auto'
        onClick={() => setIsModalOpen(true)}
      >
        Создать задачу
      </Button>
      {isModalOpen && (
        <CreateTaskModal
          isOpen={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default Header;
