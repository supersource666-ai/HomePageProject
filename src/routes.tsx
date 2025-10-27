import React from 'react';
import { RouteObject } from 'react-router-dom';
import Home from './pages/Home';
import Resume from './pages/Resume';
import Projects from './pages/Projects';
import Papers from './pages/Papers';
import Life from './pages/Life';
import Layout from './components/layout/Layout';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'resume', element: <Resume /> },
      { path: 'projects', element: <Projects /> },
      { path: 'papers', element: <Papers /> },
      { path: 'life', element: <Life /> },
    ],
  },
];

export default routes;