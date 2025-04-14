import { Outlet } from 'react-router';
import Header from '../component/Header/Header';
import { Layout } from 'antd';

function DefaultLayout() {
  return (
    <div className='w-full bg-gray-100 min-h-[100vh]'>
      <Layout className='max-w-[1440px] mx-auto flex flex-col p-1 rounded-2xl bg-gray-100 gap-2'>
        <Header />
        <Outlet />
      </Layout>
    </div>
  );
}

export default DefaultLayout;
