import * as S from './styles'

interface ButtonProps {
  title: string
  onClick?: () => void
  loading?: boolean
}

const Button: React.FC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ title, onClick, type = 'button', loading, ...rest }) => {
  return (
    <S.Button type={type} onClick={onClick} {...rest}>
      {!loading ? title : '...loading'}
    </S.Button>
  )
}

export default Button
