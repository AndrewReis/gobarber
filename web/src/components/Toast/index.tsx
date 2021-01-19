import React from 'react';
import { FiXCircle, FiAlertCircle } from 'react-icons/fi';

import { ToastMessage, useToast } from '../../context/ToastContext';

import { Container, ContentToast } from './styles';

interface ToastProps {
  messages: ToastMessage[];
}

const Toast: React.FC<ToastProps> = ( { messages} ) => {

  const { removeToast } = useToast();

  return (
    <Container>

     { messages.map(message => (
        <ContentToast key={message.id} type={message.type} hasDescription={!!message.description} >
         <FiAlertCircle size={20} />
         <div>
           <strong>{message.title}</strong>
           { message.description && <p>Não foi possivel fazer login na aplicação</p> }
         </div>
         <button onClick={ () => removeToast(message.id) } type="button" >
           <FiXCircle size={18} />
         </button>
       </ContentToast>
     ))}

    </Container>
  );
}

export default Toast;