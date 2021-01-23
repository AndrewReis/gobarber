import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex:1;
  align-items:center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 110 : 16}px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0 24px;
`;


export const BackToSignIn = styled.TouchableOpacity`

  border-top-width: 1px;
  border-color: #232129;

  flex-direction: row;
  justify-content: center;
  align-items: center;

  padding: 16px 0 ${8 + getBottomSpace()}px ;
`;

export const BackToSignInText = styled.Text`
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  color: #fff;
  margin-left: 16px;
`;
