import { forwardRef } from 'react'
import * as S from './styles'

type Error = {
  message?: string | undefined
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  placeholder?: string | ''
  error?: Error
  hasError?: boolean
}

// eslint-disable-next-line react/display-name
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, placeholder, error, ...rest }, ref) => {
    return (
      <>
        {label ? <S.Label>{label}</S.Label> : null}
        <S.Input
          ref={ref}
          placeholder={placeholder}
          hasError={!!error}
          {...rest}
        />
        {!!error?.message && <S.Error>{error.message}</S.Error>}
      </>
    )
  }
)

export default Input
