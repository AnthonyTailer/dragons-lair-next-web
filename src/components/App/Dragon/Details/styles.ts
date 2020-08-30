import styled from 'styled-components'

export const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  color: black;
  font-size: 1.5rem;
  padding: 10px;
  text-align: left;
`
export const ListItemKey = styled.div`
  color: white;
  font-weight: 700;
  min-width: 25%;
`

export const ListItemValue = styled.div`
  color: white;
  min-width: 25%;
  word-break: break-all;
`
export const ListItemAvatar = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 50px;
  box-shadow: 3px 5px 4px 1px rgb(35 35 35);
  border: 1px solid #dfe1e5;
`
