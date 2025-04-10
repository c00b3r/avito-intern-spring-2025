import { Button } from 'antd';
import { NavLink } from 'react-router';

function Header() {
  return (
    <div className='w-full p-3 flex gap-2 rounded-2xl'>
      <Button>
        <NavLink to='/issues'>Все задачи</NavLink>
      </Button>
      <NavLink to='/boards'>
        <Button>Проекты</Button>
      </NavLink>
    </div>
  );
}

export default Header;
