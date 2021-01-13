import styled, { css } from 'styled-components'

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  border: 2px solid #232129;
  color: #666360;

  ${ props => props.isFocused && css`
    border-color: #ff9000;
    color: #ff9000;
  ` }

  ${ props => props.isFilled && css`
    color: #ff9000;
  ` }

  & + div {
        margin-top: 8px;
      }

    input {
      background: transparent;
      flex: 1;
      border: 0;
      color: #f4ede8;

        &::placeholder {
          color: #666360;
        }
    }

    svg {
      margin-right: 16px;
    }
`;