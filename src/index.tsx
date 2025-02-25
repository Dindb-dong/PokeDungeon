import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { TabProvider } from './context/TabContext';
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <TabProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </TabProvider>
  </Router>
);