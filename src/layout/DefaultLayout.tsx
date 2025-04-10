import { Outlet } from 'react-router';
import Header from '../component/Header/Header';
import { Layout } from 'antd';

function DefaultLayout() {
  return (
    <div className='w-full min-h-screen bg-gray-100'>
      <Layout className='max-w-[1440px] h-[100vh] mx-auto flex flex-col p-1 rounded-2xl bg-gray-100'>
        <Header />
        <Outlet />
      </Layout>
    </div>
  );
}

export default DefaultLayout;
