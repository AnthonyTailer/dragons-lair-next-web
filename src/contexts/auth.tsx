import React, { createContext, useState, useEffect, useContext } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import api from 'services/api'

interface User {
  id: number
  name: string
  email: string
}

interface AuthContextData {
  isAuthenticated: boolean
  user: User | null
  loading: boolean
  error: string | null
  signIn(email: string, password: string): Promise<void>
  signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const route = useRouter()

  useEffect(() => {
    async function loadStoragedData() {
      try {
        const token = Cookies.get('dragons-token')

        if (token) {
          // Set token for all requests
          console.log("Got a token in the cookies, let's see if it is valid")

          api.defaults.headers.Authorization = `Bearer ${token}`
          const {
            data: { user: validUser }
          } = await api.get('user/me')

          if (validUser) {
            setUser(validUser)
          } else {
            console.error('invalid user')
          }
        }
      } catch (err) {
        console.error(err)
        setError(err?.response?.data?.message)
        Cookies.remove('dragons-token')
        Cookies.remove('dragons-user')
      } finally {
        setLoading(false)
      }
    }

    loadStoragedData()
  }, [])

  /**
   * @function sigIn
   * @param email
   * @param password
   */
  async function signIn(email: string, password: string) {
    try {
      const {
        data: { authToken, user }
      } = await api.post('login', { email, password })

      if (authToken && user) {
        setUser(user)
        // Set toke for all request
        api.defaults.headers.Authorization = `Bearer ${authToken}`

        Cookies.set('dragons-user', JSON.stringify(user))
        Cookies.set('dragons-token', authToken, { expires: 60 })
        setLoading(false)
        setError(null)
      } else {
        setError('Unable to login')
      }
    } catch (e) {
      setError(e?.response?.data?.message)
    }
  }

  /**
   * @function signOut
   */
  function signOut() {
    Cookies.remove('dragons-token')
    Cookies.remove('dragons-user')
    setUser(null)
    route.replace('/')
  }

  console.log({ isAuthenticated: !!user, user, loading, error })
  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, loading, error, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}
