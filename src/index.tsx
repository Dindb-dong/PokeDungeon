import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TabProvider } from './context/TabContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <TabProvider>
    <App />
  </TabProvider>
);