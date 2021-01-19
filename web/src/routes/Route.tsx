import React from 'react';
import { RouteProps as ReactDOMProps, Route as ReactDOMRoute, Redirect} from 'react-router-dom';

import { useAuth } from '../context/AuthenticateContext';

interface RouteProps extends ReactDOMProps{
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({ isPrivate = false, component: Component, ...rest }) => {
  const { user } = useAuth();
  return (
    <ReactDOMRoute
      { ...rest } 
      render={() => {
        return isPrivate === !!user
          ? ( <Component /> )
          : ( <Redirect to={{ pathname: isPrivate ? '/' : '/dashboard' }} /> )
      }}
    />
  );
}

export default Route;