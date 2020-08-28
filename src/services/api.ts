import Axios, { AxiosRequestConfig } from 'axios'
import { useReducer } from 'react'
import useSWR, { ConfigInterface, keyInterface } from 'swr'

const api = Axios.create({
  baseURL: 'http://localhost:3000/api/v1/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
// redirect user when not authenticated
api.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (401 === error.response.status) {
      window.location.href = '/'
    } else {
      return Promise.reject(error)
    }
  }
)

export const FETCHING = 'started'
export const SUCCESS = 'done'
export const ERROR = 'failed'

type Response = {
  message?: string | null | undefined
}

type Action =
  | { type: 'started' }
  | { type: 'done'; response: Response }
  | { type: 'failed'; response: Response }

type State = {
  status: string | null
  response?: Response | null
}

const initialState = {
  status: null,
  response: null,
  error: null
}

const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case FETCHING:
      return { ...initialState, status: FETCHING }
    case SUCCESS:
      return { ...state, status: SUCCESS, response: action.response }
    case ERROR:
      return { ...state, status: ERROR, response: action.response }
    default:
      return state
  }
}

export const useApiRequest = (): [
  State,
  (params: AxiosRequestConfig) => void
] => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchApi = async (params: AxiosRequestConfig = {}) => {
    dispatch({ type: FETCHING })
    console.log({ status: FETCHING, params })
    try {
      const { data } = await api.request(params)
      dispatch({ type: SUCCESS, response: data })
      console.log({ status: SUCCESS, params, response: data })
      return data
    } catch ({ response: { data } }) {
      dispatch({ type: ERROR, response: data })
      console.log({ status: ERROR, params, response: data })
      throw data
    }
  }

  return [state, fetchApi]
}

export const useApiSWR = (
  url: keyInterface,
  params: AxiosRequestConfig = {},
  swrConfig: ConfigInterface = {}
) => {
  const [state, fetcher] = useApiRequest()

  const swrResponse = useSWR(
    url,
    (url) => fetcher({ url, method: 'GET', ...params }),
    swrConfig
  )

  const { status, response } = state
  return { ...swrResponse, status, response }
}

export default api
