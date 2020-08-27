import styled from 'styled-components'

export const Button = styled.button`
  background-color: #ed1923;
  width: min(20rem, 100%);
  color: white;
  border: none;
  border-radius: 25px;
  margin-bottom: 5px;
  padding: 10px;

  -webkit-box-shadow: 8px 6px 11px -1px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 8px 6px 11px -1px rgba(0, 0, 0, 0.75);
  box-shadow: 8px 6px 11px -1px rgba(0, 0, 0, 0.75);

  :hover {
    background-color: #ab151c;
    cursor: pointer;
  }
`
