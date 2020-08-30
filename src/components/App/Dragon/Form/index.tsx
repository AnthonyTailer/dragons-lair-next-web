import { Dragon } from '../Table'
import { useApiRequest, FETCHING, ERROR, SUCCESS } from 'services/api'
import { useAuth } from 'contexts/auth'
import { useForm } from 'react-hook-form'
import Input from 'components/Input'
import Button from 'components/Button'
import Modal from 'components/Modal'
import { Error } from 'components/Input/styles'
import * as S from './styles'
import Textarea from 'components/Textarea'
import { useEffect } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormType: { [key: string]: any } = {
  register: 'POST',
  edit: 'PUT',
  remove: 'DELETE'
}

type FormProps = {
  dragon?: Dragon | null
  onClose: () => void
  onSuccess: () => void
  type: string
}

const Form: React.FC<FormProps> = ({
  onClose,
  onSuccess,
  dragon,
  type = 'register'
}) => {
  const [{ status, response }, fetcherApi] = useApiRequest()
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      name: dragon?.name,
      type: dragon?.type,
      avatarUrl: dragon?.avatarUrl,
      description: dragon?.description
    }
  })
  const { user } = useAuth()
  let endpoint: string
  let title = ''

  switch (type) {
    case 'register':
      endpoint = `user/${user?.id}/dragon`
      title = `${type.toUpperCase()} a new Dragon`
      break
    case 'edit':
    case 'remove':
      endpoint = `user/${user?.id}/dragon/${dragon?.id}`
      title = `${type.toUpperCase()} this Dragon`
      break

    default:
      break
  }

  const onSubmitHandler = (values: Dragon) => {
    console.log('FORM VALS ---> ', values)
    if (values) {
      fetcherApi({
        method: FormType[type],
        url: endpoint,
        data: values
      })
    }
  }

  useEffect(() => {
    if (status === SUCCESS) {
      onClose()
      onSuccess()
    }
  }, [status, onClose, onSuccess])

  const isSubmitting = status === FETCHING

  return (
    <Modal onClose={onClose} title={title}>
      <S.Form onSubmit={handleSubmit(onSubmitHandler)}>
        {['register', 'edit'].includes(type) ? (
          <>
            <Input
              name="name"
              ref={register({
                required: {
                  value: true,
                  message: 'The Name field is required'
                },
                maxLength: {
                  value: 50,
                  message: 'The Name field should be a less tha 50 caraters'
                }
              })}
              placeholder="Name"
              disabled={isSubmitting}
              error={errors?.name}
            />
            <Input
              name="type"
              ref={register({
                required: {
                  value: true,
                  message: 'The Type field is required'
                }
              })}
              placeholder="Type"
              disabled={isSubmitting}
              error={errors?.type}
            />
            <Input
              name="avatarUrl"
              ref={register()}
              placeholder="Avatar URL"
              disabled={isSubmitting}
              error={errors?.avatarUrl}
            />
            <Textarea
              name="description"
              rows={4}
              cols={50}
              ref={register({
                maxLength: {
                  value: 350,
                  message:
                    'The description field should be a less tha 350 caraters'
                }
              })}
              placeholder="Description"
              disabled={isSubmitting}
              error={errors?.description}
            />
            <Button
              title="Save"
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
              style={{ marginTop: 5 }}
            />
          </>
        ) : (
          <>
            <S.ContentMessage>
              Do you really wan to remove this dragon?
            </S.ContentMessage>
            <Button
              title="Delete"
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
              style={{ alignSelf: 'center' }}
            />
          </>
        )}
        {status === ERROR && (
          <Error style={{ padding: 10, alignSelf: 'center' }}>
            {response?.message || String(response)}
          </Error>
        )}
      </S.Form>
    </Modal>
  )
}

export default Form
