import styled from 'styled-components'

export const Input = styled.input`
  background-color: #6a7b85;
  color: white;
  border: none;
  border-radius: 25px;
  margin-bottom: 10px;
  padding: 10px;
  width: min(20rem, 100%);

  :hover {
    background-color: #6a6a6a;
  }

  ::placeholder,
  ::-webkit-input-placeholder {
    color: #fff;
  }
  :-ms-input-placeholder {
    color: #fff;
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
