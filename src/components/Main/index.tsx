import React from 'react'
import * as S from './styles'
import Input from 'components/Input'
import Button from 'components/Button'

const Main = ({
  title = 'Dragons Lair',
  description = 'Manage your Dragons'
}) => (
  <S.Wrapper>
    <S.Logo
      src="/img/icon-512.png"
      alt="Imagem de um dragão vermelho com a boca aberta"
    />
    <S.Title>{title}</S.Title>
    <S.Description>{description}</S.Description>
    <Input type="email" placeholder="E-mail" />
    <Input type="password" placeholder="Password" />
    <Button title="Login" />
  </S.Wrapper>
)

export default Main
