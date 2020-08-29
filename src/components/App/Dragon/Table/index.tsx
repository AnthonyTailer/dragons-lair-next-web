import { useState } from 'react'
import { Dragon } from '../index'
import Details from '../Details'
import * as S from './styles'
import EditSvg from '../../../../assets/edit.svg'
import MoreSvg from '../../../../assets/more.svg'
import CloseSvg from '../../../../assets/close.svg'

type TableProps = {
  dragons: Dragon[]
}

const iconCommomStyles = {
  width: 22,
  height: 22,
  cursor: 'pointer'
}

const Table: React.FC<TableProps> = ({ dragons }) => {
  const [selectedDragon, setSelectedDragon] = useState<Dragon>()
  const [openDetailsModal, setOpenDetailsModal] = useState(false)

  return (
    <S.Wrapper>
      <S.TableHeader>
        <S.ListItemKey>Name</S.ListItemKey>
        <S.ListItemKey>Type</S.ListItemKey>
        <S.ListItemKey>Created At</S.ListItemKey>
        <S.ListItemKey>Actions</S.ListItemKey>
      </S.TableHeader>
      {dragons.map((dragon: Dragon) => {
        return (
          <S.ListItem key={dragon.id}>
            <S.ListItemValue>{dragon.name}</S.ListItemValue>
            <S.ListItemValue>{dragon.type}</S.ListItemValue>
            <S.ListItemValue>{dragon.createdAt}</S.ListItemValue>

            <S.ListItemActions>
              <MoreSvg
                {...iconCommomStyles}
                onClick={() => {
                  setOpenDetailsModal(true)
                  setSelectedDragon(dragon)
                }}
                fill="rgb(0, 122, 255)"
              />
              <EditSvg
                {...iconCommomStyles}
                fill="rgb(52, 199, 89)"
                onClick={() => console.log('edit')}
              />
              <CloseSvg
                {...iconCommomStyles}
                fill="rgb(255, 59, 85)"
                onClick={() => console.log('delete')}
              />
            </S.ListItemActions>
          </S.ListItem>
        )
      })}

      <Details
        title={`${selectedDragon?.name} details`}
        open={openDetailsModal}
        dragon={selectedDragon}
        onClose={() => {
          setOpenDetailsModal(false)
          setSelectedDragon(undefined)
        }}
      />
    </S.Wrapper>
  )
}

export default Table
