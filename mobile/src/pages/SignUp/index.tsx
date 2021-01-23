import React from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import logoGoBarber from '../../assets/logo.png';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Title, BackToSignIn, BackToSignInText } from './styles';

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  return (
    <>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={ Platform.OS === 'ios' ? 'padding' : undefined } enabled >
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1 }} >
          <Container>
            <Image source={logoGoBarber} />
            <Title> Crie sua conta </Title>

            <Input name="name" icon="user" placeholder="Nome" />
            <Input name="email" icon="mail" placeholder="E-mail" />
            <Input name="password" icon="lock" placeholder="Senha" />
            <Button>Entrar</Button>
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