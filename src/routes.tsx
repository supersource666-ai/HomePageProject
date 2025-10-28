import React from 'react';
import { RouteObject } from 'react-router-dom';
import Home from './pages/Home';
import Resume from './pages/Resume';
import Projects from './pages/Projects';
import DataVisualization from './pages/Projects/DataVisualization';
import RealtimeData from './pages/Projects/RealtimeData';
import SceneVisualization from './pages/Projects/SceneVisualization';
import DataProcessing from './pages/Projects/DataProcessing';
import CloudExplore from './pages/Projects/CloudExplore';
import Editor from './pages/Projects/Editor';
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
      {
        path: 'projects',
        element: <Projects />,
        children: [
          { path: 'DataVisualization', element: <DataVisualization /> },
          { path: 'RealtimeData', element: <RealtimeData /> },
          { path: 'SceneVisualization', element: <SceneVisualization /> },
          { path: 'DataProcessing', element: <DataProcessing /> },
          { path: 'CloudExplore', element: <CloudExplore /> },
          { path: 'Editor', element: <Editor /> },
        ],
      },
      { path: 'papers', element: <Papers /> },
      { path: 'life', element: <Life /> },
    ],
  },
];

export default routes;