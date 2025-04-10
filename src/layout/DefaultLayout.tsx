import { Outlet } from 'react-router';
import Header from '../component/Header/Header';
import { Layout } from 'antd';

function DefaultLayout() {
  return (
    <Layout className='max-w-[1440px] h-[100vh] mx-auto flex flex-col p-1 rounded-2xl'>
      <Header />
      <Outlet />
    </Layout>
  );
}

export default DefaultLayout;
