import { shade } from 'polished';
import styled from 'styled-components'

export const Container = styled.button`
	background: #ff9000;
  color: #312e38;
  margin-top: 16px;
  font-weight: 500;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  width: 100%;
  height: 56px;
  transition: background 0.2s;

  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }
`;