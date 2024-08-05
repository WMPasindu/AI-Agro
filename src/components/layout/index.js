import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  console.log('Home');
  return (
    <main>
      <div className="space-vertical">
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;