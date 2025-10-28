import React from 'react';
import './types/css/App.css';
import { useRoutes } from 'react-router-dom';
import routes from './routes';

function App() {
  const element = useRoutes(routes);
  return element;
}

export default App;
