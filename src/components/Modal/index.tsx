import * as S from './styles'

type ModalProps = {
  onClose: () => void
  title: string
}

const Modal: React.FC<ModalProps> = ({ children, onClose, title }) => {
  return (
    <S.Wrapper>
      <S.Content>
        <S.Header>
          <S.Title>{title}</S.Title>
          <S.CloseBtn onClick={onClose}>&times;</S.CloseBtn>
        </S.Header>
        {children}
      </S.Content>
    </S.Wrapper>
  )
}

export default Modal
