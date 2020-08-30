import styled from 'styled-components'
import { InputProps } from './index'

export const Input = styled.input<InputProps>`
  background-color: #3a3b3c;
  color: ${(props) => (props.hasError ? '#ed1923' : 'white')};
  border: none;
  border-bottom: ${(props) => (props.hasError ? '2px solid #ed1923' : 'none')};
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 10px;
  width: 100%;

  :hover {
    background-color: #6a6a6a;
  }

  :focus {
    outline-width: 0;
  }

  :disabled {
    background-color: #6a6a6a;
    cursor: not-allowed;
  }

  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${(props) => (props.disabled ? '#8a949a' : '#eee')};
  }
  :-ms-input-placeholder {
    color: ${(props) => (props.disabled ? '#8a949a' : '#eee')};
  }

  -webkit-box-shadow: 8px 6px 11px -1px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 8px 6px 11px -1px rgba(0, 0, 0, 0.75);
  box-shadow: 8px 6px 11px -1px rgba(0, 0, 0, 0.75);
`

export const Label = styled.span`
  text-align: 'left';
  padding: 2px;
  font-size: 1.5rem;
`

export const Error = styled.span`
  text-align: 'left';
  padding: 2px;
  font-size: 1.5rem;
  color: #ed1923;
  margin-bottom: 8px;
  text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.75);
`
