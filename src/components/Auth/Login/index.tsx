import React, { useEffect } from 'react'
import * as S from '../styles'
import Input from 'components/Input'
import { Error } from 'components/Input/styles'
import Button from 'components/Button'
import { useAuth } from 'contexts/auth'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Link from 'next/link'

interface LoginForm {
  email: string | undefined
  password: string | undefined
}

const Login = ({
  title = 'Dragons Lair',
  description = 'Manage your Dragons'
}) => {
  const route = useRouter()

  const { signIn, loading, isAuthenticated, error: failedMessage } = useAuth()
  const { register, handleSubmit, watch, errors, setError } = useForm<
    LoginForm
  >()

  const formValues = watch()

  useEffect(() => {
    if (isAuthenticated && !failedMessage && !loading) {
      route.push('/dragon')
    }
  }, [isAuthenticated, route, failedMessage, loading])

  useEffect(() => {
    if (failedMessage) {
      setError('email', { type: 'manual' })
      setError('password', { type: 'manual' })
    }
  }, [failedMessage, setError])

  const handleLogin = (data: LoginForm): void => {
    const { email, password } = data
    if (email && password) {
      signIn(email, password)
    }
  }

  return !isAuthenticated && !loading ? (
    <S.Wrapper>
      <S.Logo src="/img/icon-512.png" alt="Imagem de um dragão vermelho" />
      <S.Title>{title}</S.Title>
      <S.Description>{description}</S.Description>
      <S.Form onSubmit={handleSubmit(handleLogin)}>
        <Input
          name="email"
          type="email"
          ref={register({
            required: {
              value: true,
              message: 'The E-mail field is required'
            },
            pattern: {
              value: /^[^@]+@[^@]+\.[^@]+$/,
              message: 'The e-mail is not valid'
            }
          })}
          placeholder="E-mail"
          disabled={loading}
          error={errors?.email}
        />
        <Input
          name="password"
          type="password"
          ref={register({
            required: {
              value: true,
              message: 'The Password field is required'
            }
          })}
          placeholder="Password"
          disabled={loading}
          error={errors?.password}
        />
        <Button
          title="Login"
          type="submit"
          disabled={loading || !formValues.email || !formValues.password}
          loading={loading}
        />
        <Link href="/signup" as="signup">
          <S.SignupLink>Don’t have an account yet? Sign Up</S.SignupLink>
        </Link>
        {!!failedMessage && (
          <Error style={{ padding: 10 }}>{failedMessage}</Error>
        )}
      </S.Form>
    </S.Wrapper>
  ) : null
}

export default Login
