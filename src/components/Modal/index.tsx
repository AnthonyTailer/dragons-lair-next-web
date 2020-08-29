import * as S from './styles'

type ModalProps = {
  open: boolean
  onClose: () => void
  title: string
}

const Modal: React.FC<ModalProps> = ({ open, children, onClose, title }) => {
  return open ? (
    <S.Wrapper>
      <S.Content>
        <S.Header>
          <S.Title>{title}</S.Title>
          <S.CloseBtn onClick={onClose}>&times;</S.CloseBtn>
        </S.Header>
        {children}
      </S.Content>
    </S.Wrapper>
  ) : null
}

export default Modal
