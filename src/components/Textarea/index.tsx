import { forwardRef } from 'react'
import * as S from './styles'

type Error = {
  message?: string | undefined
}

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  placeholder?: string | ''
  error?: Error
  hasError?: boolean
}

// eslint-disable-next-line react/display-name
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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

export default Textarea
