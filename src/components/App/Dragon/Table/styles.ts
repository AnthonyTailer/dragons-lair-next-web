import styled from 'styled-components'

export const Wrapper = styled.div`
  background-color: #fff;
  padding: 5px;
  display: flex;
  flex-direction: column;
  width: min(700px, 90%);
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
  border-bottom: 1px solid #eee;
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

export const ListItemValue = styled.div`
  min-width: 25%;
  max-width: 25%;
`
export const ListItemKey = styled.div`
  font-weight: 700;
  min-width: 25%;
  max-width: 25%;
`
export const ListItemActions = styled.div`
  min-width: 25%;
  max-width: 25%;
  display: flex;
  justify-content: center;
  & > svg {
    padding: 2px;
    :hover {
      fill: #eee;
    }
  }
`
