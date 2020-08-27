import * as S from './styles'

interface InputProps {
  label?: string
  placeholder?: string | ''
}

const Input: React.FC<
  InputProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({ label, placeholder, ...rest }) => {
  return (
    <>
      {label ? <S.Label>{label}</S.Label> : null}
      <S.Input placeholder={placeholder} {...rest} />
    </>
  )
}

export default Input
