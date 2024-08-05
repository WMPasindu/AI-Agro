import React from 'react';
import { Route, Routes } from 'react-router-dom';

import PrivateRoutes from './privateRoutes';
import NotFound from '../pages/notFound';
import Layout from '../components/layout';
import Home from '../pages/home';

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='*' element={<NotFound />} />

        <Route element={<PrivateRoutes />}>
          <Route path='/' element={<Home />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
