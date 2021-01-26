import React, { useCallback, useRef } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import logoGoBarber from '../../assets/logo.png';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccount, CreateAccountText } from './styles';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const handleSubmit = useCallback((data) => {
    console.log(data);
  }, []);


  return (
    <>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={ Platform.OS === 'ios' ? 'padding' : undefined } enabled >
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1 }} >
          <Container>
            <Image source={logoGoBarber} />
            <Title> Faça seu logon </Title>


            <Form ref={formRef} onSubmit={handleSubmit} style={{ width: '100%' }} >
              <Input
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
              />

              <Input
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Senha"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
              <Button onPress={ () => formRef.current?.submitForm() } >Entrar</Button>
            </Form>


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
