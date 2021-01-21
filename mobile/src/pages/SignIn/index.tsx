import React from 'react';
import { Image } from 'react-native';

import logoGoBarber from '../../assets/logo.png';

import { Container } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoGoBarber} />
    </Container>
  )
}

export default SignIn;
