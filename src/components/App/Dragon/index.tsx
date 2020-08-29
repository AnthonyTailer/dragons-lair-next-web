import { useEffect } from 'react'
import { useAuth } from 'contexts/auth'
import { useRouter } from 'next/router'
import * as S from './styles'
import { useApiSWR } from 'services/api'
import Table from './Table'

export type Dragon = {
  id: string
  name: string
  type: string
  createdAt: string
}

export default function Dragon() {
  const route = useRouter()
  const { isAuthenticated, loading, user } = useAuth()
  const { data, error } = useApiSWR(
    isAuthenticated && user ? `user/${user?.id}/dragon` : null
  )
  const isLoadingDragons = !data && !error

  useEffect(() => {
    console.log(error)
    if (!isAuthenticated && !loading) {
      route.replace('/')
    }
  }, [isAuthenticated, loading, route, error])

  return isAuthenticated ? (
    <S.Wrapper>
      <S.Title>Welcome {user?.name}!</S.Title>
      <S.Description>Here are your dragons</S.Description>
      {isLoadingDragons ? (
        <span>....Loading</span>
      ) : (
        <Table dragons={data?.dragons} />
      )}
    </S.Wrapper>
  ) : null
}
