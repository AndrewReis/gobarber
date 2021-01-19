import React,{ createContext, useContext, useCallback, useState } from 'react';
import { v4 as uuid } from 'uuid';

import Toast from '../components/ToastContainer';

export interface ToastMessage {
  id: string;
  type: 'info' | 'success' | 'error';
  title: string;
  description?: string;
}

interface ToastContextProps {
  addToast(messages: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextProps>({} as ToastContextProps);

const ToastProvider: React.FC = ({ children }) => {

  const [ messages, setMessage ] = useState<ToastMessage[]>([]); 

  const addToast = useCallback( ( { type, title, description }: Omit<ToastMessage, 'id'> ) => {
    const id = uuid();
    const toast = {
      id,
      type,
      title,
      description
    };

    setMessage([...messages, toast]);

  }, [messages]);

  const removeToast = useCallback( (id: string) => {
    setMessage(state => state.filter(toastId => toastId.id !== id));
  }, []);

  return(
    <ToastContext.Provider value={{ addToast, removeToast }} >
      { children }
      <Toast messages={messages} />
    </ToastContext.Provider>
  );
}

function useToast(){
  const context = useContext(ToastContext);

  if(!context){
    throw new Error('useToast must be used within a ToastProvider.');
  }

  return context;
}

export { useToast, ToastProvider };