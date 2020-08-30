import { useEffect } from 'react'
import { useAuth } from 'contexts/auth'
import { useRouter } from 'next/router'
import * as S from './styles'
import Table from './Table'

export default function Dragon() {
  const route = useRouter()
  const { isAuthenticated, loading, user } = useAuth()

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      route.replace('/')
    }
  }, [isAuthenticated, loading, route])

  return isAuthenticated ? (
    <S.Wrapper>
      <S.Title>Welcome {user?.name}!</S.Title>
      <S.Description>These are your dragons</S.Description>
      <Table />
    </S.Wrapper>
  ) : null
}
