import { useAuth } from 'contexts/auth'
import * as S from './styles'

const ToolBar = () => {
  const { user, signOut } = useAuth()
  return user ? (
    <S.ToolBar>
      <S.Avatar src={'/img/icon-192.png'} />
      <S.AppName>Dragon&apos;s Lair</S.AppName>
      <S.Logout
        style={{
          marginLeft: 'auto'
        }}
        onClick={() => signOut()}
      >
        Logout
      </S.Logout>
    </S.ToolBar>
  ) : null
}

export default ToolBar
