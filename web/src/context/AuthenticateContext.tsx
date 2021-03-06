import React, { createContext, useCallback, useContext, useState } from 'react'

import api from '../services/api';

interface AuthData {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextProps {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps );

const AuthProvider: React.FC = ({ children }) => {

  const [ data, setData ] = useState<AuthData>( () => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user){
      return {
        token,
        user: JSON.parse(user)
      }
    }else {
      return {} as AuthData
    }
  });

  const signIn = useCallback( async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password
    });

    const { token, user } = response.data;

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    setData({ token, user })
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setData({} as AuthData );
  }, []);

  return (
    <AuthContext.Provider value={ { user: data.user, signIn, signOut } } >
      { children }
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextProps {
  const context = useContext(AuthContext);

  if(!context){
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}


export { useAuth, AuthProvider };