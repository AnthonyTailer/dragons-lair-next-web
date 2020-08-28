import React, { useEffect } from 'react'
import * as S from '../styles'
import Input from 'components/Input'
import { Error } from 'components/Input/styles'
import Button from 'components/Button'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useApiRequest, FETCHING, SUCCESS, ERROR } from 'services/api'
import { useAuth } from 'contexts/auth'

interface SignupForm {
  name: string | undefined
  email: string | undefined
  password: string | undefined
}

const Signup = ({
  title = 'Dragons Lair',
  description = 'Create your account'
}) => {
  const route = useRouter()
  const { isAuthenticated, loading } = useAuth()
  const [{ status, response }, fetchApi] = useApiRequest()
  const {
    register,
    handleSubmit,
    watch,
    errors,
    setError,
    clearErrors
  } = useForm<SignupForm>()

  const formValues = watch()
  const isSubmitting = status === FETCHING

  useEffect(() => {
    if (status === ERROR) {
      setError('name', { type: 'manual' })
      setError('email', { type: 'manual' })
      setError('password', { type: 'manual' })
    } else if (status === SUCCESS) {
      clearErrors()
      route.back()
    }
  }, [status, setError, clearErrors, route])

  const handleSignup = (data: SignupForm): void => {
    const { name, email, password } = data
    if (name && email && password) {
      fetchApi({
        method: 'POST',
        url: 'signup',
        data: { name, email, password }
      })
    }
  }

  return !isAuthenticated && !loading ? (
    <S.Wrapper>
      <S.Logo src="/img/icon-512.png" alt="Imagem de um dragão vermelho" />
      <S.Title>{title}</S.Title>
      <S.Description>{description}</S.Description>
      <S.Form onSubmit={handleSubmit(handleSignup)}>
        <Input
          name="name"
          type="text"
          ref={register({
            required: { value: true, message: 'The name field is required' },
            maxLength: 50
          })}
          placeholder="name"
          disabled={isSubmitting}
          error={errors?.name}
        />
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
          disabled={isSubmitting}
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
          disabled={isSubmitting}
          error={errors?.password}
        />
        <Button
          title="Signup"
          type="submit"
          disabled={
            isSubmitting ||
            !formValues.email ||
            !formValues.password ||
            !formValues.name
          }
          loading={isSubmitting}
        />
        <Link href="/" as="/">
          <S.SignupLink aria-disabled={isSubmitting}>
            Back to Login
          </S.SignupLink>
        </Link>
        {status === ERROR && (
          <Error style={{ padding: 10 }}>{response?.message}</Error>
        )}
      </S.Form>
    </S.Wrapper>
  ) : null
}

export default Signup
