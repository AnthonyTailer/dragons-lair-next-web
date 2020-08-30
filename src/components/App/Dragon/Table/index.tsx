import { useState } from 'react'
import { useAuth } from 'contexts/auth'
import Details from '../Details'
import * as S from './styles'
import EditSvg from '../../../../assets/edit.svg'
import MoreSvg from '../../../../assets/more.svg'
import CloseSvg from '../../../../assets/close.svg'
import { useApiSWR } from 'services/api'
import Form from '../Form'
import Button from 'components/Button'

export type Dragon = {
  id: string
  name: string
  type: string
  avatarUrl?: string | null
  description?: string | null
  createdAt: string
  updatedAt?: string | null
}

const iconCommomStyles = {
  width: 22,
  height: 22,
  cursor: 'pointer'
}

const Table: React.FC = () => {
  const { user } = useAuth()
  const [selectedDragon, setSelectedDragon] = useState<Dragon>()
  const [openDetailsModal, setOpenDetailsModal] = useState(false)
  const [openFormModal, setOpenFormModal] = useState(false)
  const [formType, setFormType] = useState('')
  const { data, error, mutate } = useApiSWR(
    user ? `user/${user?.id}/dragon` : null
  )
  const isLoadingDragons = !data && !error

  return (
    <>
      <Button
        title="Create a Dragon"
        onClick={() => {
          setFormType('register')
          setOpenFormModal(true)
        }}
        style={{ marginBottom: 20, width: 'min(15rem,100%)' }}
      />
      <S.Wrapper>
        <S.TableHeader>
          <S.ListItemKey style={{ maxWidth: '10%', minWidth: '10%' }}>
            #
          </S.ListItemKey>
          <S.ListItemKey>Name</S.ListItemKey>
          <S.ListItemKey>Type</S.ListItemKey>
          <S.ListItemKey>Created At</S.ListItemKey>
          <S.ListItemKey>Actions</S.ListItemKey>
        </S.TableHeader>
        {isLoadingDragons ? (
          <S.ListItemValue>Loading...</S.ListItemValue>
        ) : (
          <>
            {!data?.dragons.length ? (
              <S.ListItem>
                <S.ListItemKey
                  style={{ minWidth: '100%', maxWidth: '100%', padding: 50 }}
                >
                  Nothing found! Try to create one
                </S.ListItemKey>
              </S.ListItem>
            ) : null}
            {data?.dragons.map((dragon: Dragon) => {
              return (
                <S.ListItem key={dragon.id}>
                  <S.ListItemValue style={{ maxWidth: '10%', minWidth: '10%' }}>
                    <S.ListItemAvatar
                      src={dragon?.avatarUrl || '/img/icon-192.png'}
                    />
                  </S.ListItemValue>
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
                      onClick={() => {
                        setFormType('edit')
                        setOpenFormModal(true)
                        setSelectedDragon(dragon)
                      }}
                    />
                    <CloseSvg
                      {...iconCommomStyles}
                      fill="rgb(255, 59, 85)"
                      onClick={() => {
                        setFormType('remove')
                        setOpenFormModal(true)
                        setSelectedDragon(dragon)
                      }}
                    />
                  </S.ListItemActions>
                </S.ListItem>
              )
            })}
          </>
        )}

        {openDetailsModal ? (
          <Details
            title={`${selectedDragon?.name} details`}
            dragon={selectedDragon}
            onClose={() => {
              setOpenDetailsModal(false)
              setSelectedDragon(undefined)
            }}
          />
        ) : null}

        {openFormModal ? (
          <Form
            type={formType}
            dragon={selectedDragon}
            onClose={() => {
              setOpenFormModal(false)
              setSelectedDragon(undefined)
            }}
            onSuccess={() => {
              mutate()
            }}
          />
        ) : null}
      </S.Wrapper>
    </>
  )
}

export default Table
