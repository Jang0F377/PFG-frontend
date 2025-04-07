import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout: FC = () => (
  <div className="min-h-screen scroll-smooth bg-gray-50 antialiased" lang="en">
    <main className="mx-0.5 flex flex-col items-center justify-center">
      <Outlet />
    </main>
  </div>
);

export default MainLayout;
