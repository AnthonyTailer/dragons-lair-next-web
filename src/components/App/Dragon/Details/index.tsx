import { Dragon } from '../Table'
import Modal from 'components/Modal'
import { useAuth } from 'contexts/auth'
import { useApiSWR } from 'services/api'
import * as S from './styles'

type DetailsProps = {
  dragon?: Dragon
  onClose: () => void
  title: string
}

const Details: React.FC<DetailsProps> = ({ dragon, onClose, title }) => {
  const { user } = useAuth()
  const { data, error } = useApiSWR(
    dragon ? `user/${user?.id}/dragon/${dragon?.id}` : null
  )

  const isLoadingDragon = !data && !error

  let content = null
  if (!dragon) {
    content = (
      <S.ListItem>
        <S.ListItemKey>You should select a Dragon</S.ListItemKey>
      </S.ListItem>
    )
  } else if (isLoadingDragon) {
    content = (
      <S.ListItem>
        <S.ListItemKey>Loading Dragon details...</S.ListItemKey>
      </S.ListItem>
    )
  } else if (error) {
    content = (
      <S.ListItem>
        <S.ListItemKey>Erro: {error}</S.ListItemKey>
      </S.ListItem>
    )
  } else {
    const { dragon: detailedDragon } = data
    content = (
      <>
        <S.ListItem style={{ justifyContent: 'center', borderBottom: 0 }}>
          <S.ListItemAvatar
            src={detailedDragon?.avatarUrl || '/img/icon-192.png'}
          />
        </S.ListItem>
        <S.ListItem>
          <S.ListItemKey>Id</S.ListItemKey>
          <S.ListItemValue>{detailedDragon?.id ?? '-'}</S.ListItemValue>
        </S.ListItem>
        <S.ListItem>
          <S.ListItemKey>Name</S.ListItemKey>
          <S.ListItemValue>{detailedDragon?.name ?? '-'}</S.ListItemValue>
        </S.ListItem>
        <S.ListItem>
          <S.ListItemKey>Type</S.ListItemKey>
          <S.ListItemValue>{detailedDragon?.type ?? '-'}</S.ListItemValue>
        </S.ListItem>
        <S.ListItem>
          <S.ListItemKey>Description</S.ListItemKey>
          <S.ListItemValue>
            {detailedDragon?.description ?? '-'}
          </S.ListItemValue>
        </S.ListItem>
        <S.ListItem>
          <S.ListItemKey>Avatar URL</S.ListItemKey>
          <S.ListItemValue>{detailedDragon?.avatarUrl ?? '-'}</S.ListItemValue>
        </S.ListItem>
        <S.ListItem>
          <S.ListItemKey>Created At</S.ListItemKey>
          <S.ListItemValue>{detailedDragon?.createdAt ?? '-'}</S.ListItemValue>
        </S.ListItem>
        <S.ListItem>
          <S.ListItemKey>Updated At</S.ListItemKey>
          <S.ListItemValue>{detailedDragon?.updatedAt ?? '-'}</S.ListItemValue>
        </S.ListItem>
      </>
    )
  }

  return (
    <Modal onClose={onClose} title={title}>
      {content}
    </Modal>
  )
}

export default Details
