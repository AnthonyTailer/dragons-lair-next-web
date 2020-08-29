import styled from 'styled-components'

export const Wrapper = styled.section`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`

export const Content = styled.main`
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: min(300px, 80%); /* Could be more or less, depending on screen size */
  min-height: 60%;
  border-radius: 11px 11px 11px 11px;
`

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`

export const CloseBtn = styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;

  :hover,
  :focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`
export const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: black;
  align-self: center;
`
