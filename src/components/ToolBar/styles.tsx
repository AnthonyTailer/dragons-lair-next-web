import styled from 'styled-components'

export const ToolBar = styled.main`
  display: flex;
  width: 100%;
  height: 50px;
  background-color: #242526;
  position: fixed;
  top: 0;
  align-items: center;
  justify-content: flex-start;
`

export const Avatar = styled.img`
  width: 35px;
  height: 35px;
  margin: 10px;
`

export const AppName = styled.span`
  color: white;
  font-size: 1.5rem;
  margin: 10px;
`

export const Logout = styled.span`
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  margin: 15px;
`
