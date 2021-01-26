import React, { useEffect, useRef } from 'react';
import { TextInputProps } from 'react-native';

import { Container, TextInput } from './styles';
import Icon from 'react-native-vector-icons/Feather';
import { useField } from '@unform/core';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueRef {
  value: string;
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => {
  const { registerField, fieldName, defaultValue = '', error } = useField(name);
  const inputValueRef = useRef<InputValueRef>({ value: defaultValue });


  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value'
    })
  }, [fieldName, registerField]);

  return(
    <Container>
      <Icon name={icon} size={20} color="#666360" />
      <TextInput
        defaultValue={defaultValue}
        onChangeText={value => {
          inputValueRef.current.value = value
        }}
        placeholderTextColor="#666360" {...rest}
      />
    </Container>
  );
}

export default Input;
