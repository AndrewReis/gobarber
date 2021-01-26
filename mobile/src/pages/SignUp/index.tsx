import React, { useCallback, useRef } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';


import logoGoBarber from '../../assets/logo.png';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Title, BackToSignIn, BackToSignInText } from './styles';

const SignUp: React.FC = () => {
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
            <Title> Crie sua conta </Title>

            <Form ref={formRef} onSubmit={handleSubmit} style={{ width: '100%' }} >
              <Input name="name" icon="user" placeholder="Nome" />
              <Input name="email" icon="mail" placeholder="E-mail" />
              <Input name="password" icon="lock" placeholder="Senha" />
              <Button onPress={() => formRef.current?.submitForm() } >Entrar</Button>
            </Form>


          </Container>
        </ScrollView>
     </KeyboardAvoidingView>
      <BackToSignIn onPress={ () => navigation.goBack() } >
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignInText> Voltar para logon </BackToSignInText>
      </BackToSignIn>
    </>
  )
}

export default SignUp;
