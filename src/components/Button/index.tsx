import * as S from './styles'

interface ButtonProps {
  title: string
  onClick?: () => void
}

const Button: React.FC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ title, onClick, type = 'button', ...rest }) => {
  return (
    <S.Button type={type} onClick={onClick} {...rest}>
      {title}
    </S.Button>
  )
}

export default Button
