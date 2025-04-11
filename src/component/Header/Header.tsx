import { Button } from 'antd';
import { NavLink } from 'react-router';

function Header() {
  return (
    <div className='p-3 flex gap-2 bg-white rounded-xl shadow-sm'>
      <NavLink to='/issues'>
        <Button>Все задачи</Button>
      </NavLink>
      <NavLink to='/boards'>
        <Button>Проекты</Button>
      </NavLink>
      <Button type='primary' className='ml-auto'>
        Создать задачу
      </Button>
    </div>
  );
}

export default Header;
