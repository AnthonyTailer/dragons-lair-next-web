import styled from 'styled-components'

export const Button = styled.button`
  background-color: #f02849;
  width: min(20rem, 100%);
  color: ${(props) => (props.disabled ? '#8a949a' : 'white')};
  border: none;
  border-radius: 25px;
  margin-bottom: 5px;
  padding: 10px;

  -webkit-box-shadow: 8px 6px 11px -1px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 8px 6px 11px -1px rgba(0, 0, 0, 0.75);
  box-shadow: 8px 6px 11px -1px rgba(0, 0, 0, 0.75);

  :hover {
    background-color: #b71f38;
    cursor: pointer;
  }

  :disabled {
    background-color: #b71f38;
    cursor: not-allowed;
  }
`
