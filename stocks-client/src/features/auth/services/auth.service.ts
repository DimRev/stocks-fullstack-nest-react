import { AxiosError } from 'axios'
import { axiosInstance } from '../../../lib/axios'

export const authService = {
  register,
  login,
  logout,
}

type RegisterProps = {
  email: string
  username: string
  password: string
}

async function register({ email, username, password }: RegisterProps) {
  try {
    const { data } = await axiosInstance
      .post<{
        email: string
        username: string
        stockSymbols: string[]
      }>('/auth/register', {
        email,
        username,
        password,
      })
      .catch((err) => {
        console.error(err)
        if (err instanceof AxiosError) throw err.response?.data!.message
        else throw new Error('Something went wrong')
      })
    return data
  } catch (err) {
    console.error(err)
    if (typeof err === 'string') throw new Error(err)
  }
}

type LoginProps = {
  email: string
  password: string
}

async function login({ email, password }: LoginProps) {
  try {
    const { data } = await axiosInstance
      .post<{
        email: string
        username: string
        stockSymbols: string[]
      }>('/auth/login', {
        email,
        password,
      })
      .catch((err) => {
        console.error(err)
        if (err instanceof AxiosError) throw err.response?.data!.message
        else throw new Error('Something went wrong')
      })
    return data
  } catch (err) {
    console.error(err)
    if (typeof err === 'string') throw new Error(err)
  }
}

async function logout() {
  try {
    await axiosInstance.post('/auth/logout').catch((err) => {
      console.error(err)
      if (err instanceof AxiosError) throw err.response?.data!.message
      else throw new Error('Something went wrong')
    })
  } catch (err) {
    console.error(err)
    if (typeof err === 'string') throw new Error(err)
  }
}
