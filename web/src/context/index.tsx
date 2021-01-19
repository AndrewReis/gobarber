import React from 'react';

import { ToastProvider } from './ToastContext';
import { AuthProvider } from './AuthenticateContext';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      { children }
    </ToastProvider>
  </AuthProvider>
);

export default AppProvider;