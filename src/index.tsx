import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TabProvider } from './context/TabContext';
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <TabProvider>
      <App />
    </TabProvider>
  </AuthProvider>
);