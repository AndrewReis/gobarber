import React from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';


import logoGoBarber from '../../assets/logo.png';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccount, CreateAccountText } from './styles';

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  return (
    <>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={ Platform.OS === 'ios' ? 'padding' : undefined } enabled >
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1 }} >
          <Container>
            <Image source={logoGoBarber} />
            <Title> Faça seu logon </Title>

            <Input name="email" icon="mail" placeholder="E-mail" />
            <Input name="password" icon="lock" placeholder="Senha" />
            <Button>Entrar</Button>

            <ForgotPassword>
              <ForgotPasswordText> Esqueci minha senha </ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
     </KeyboardAvoidingView>
      <CreateAccount onPress={ () => navigation.navigate('SignUp') } >
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountText> Criar conta! </CreateAccountText>
      </CreateAccount>
    </>
  )
}

export default SignIn;