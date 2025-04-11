import { Button } from 'antd';
import { NavLink } from 'react-router';

function Header() {
  console.log(import.meta.env.VITE_API_URL);
  return (
    <div className='p-3 flex gap-2 bg-white rounded-xl shadow-sm h-16'>
      <Button>
        <NavLink to='/issues'>Все задачи</NavLink>
      </Button>
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
