import styled from 'styled-components'

export const Wrapper = styled.div`
  background-color: #242526;
  padding: 5px;
  display: flex;
  flex-direction: column;
  width: min(800px, 90%);
  border-radius: 11px 11px 11px 11px;
`

export const TableHeader = styled.div`
  display: flex;
  justify-content: space-around;
  color: black;
  font-size: 1.5rem;
  padding: 10px;
  text-align: center;

  @media (max-width: 800px) {
    div:nth-last-child(2) {
      display: none;
    }
  }

  @media (max-width: 650px) {
    div:nth-last-child(3) {
      display: none;
    }
  }
`

export const ListItem = styled.div`
  display: flex;
  border-bottom: 1px solid #bbb;
  justify-content: space-around;
  align-items: center;
  color: black;
  font-size: 1.5rem;
  padding: 10px;
  text-align: center;

  :last-child {
    border-bottom: none;
  }

  @media (max-width: 800px) {
    div:nth-last-child(2) {
      display: none;
    }
  }

  @media (max-width: 650px) {
    div:nth-last-child(3) {
      display: none;
    }
  }
`

export const ListItemValue = styled.div`
  color: #e4e6eb;
  min-width: 20%;
  max-width: 20%;
`
export const ListItemKey = styled.div`
  color: #e4e6eb;
  font-weight: 700;
  min-width: 20%;
  max-width: 20%;
`

export const ListItemAvatar = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 25px;
  border: 2px solid #292929;
`

export const ListItemActions = styled.div`
  min-width: 20%;
  max-width: 20%;
  display: flex;
  justify-content: center;
  & > svg {
    padding: 2px;
    :hover {
      fill: #eee;
    }
  }
`
