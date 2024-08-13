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
    const { data } = await axiosInstance.post<{
      email: string
      username: string
    }>('/auth/register', {
      email,
      username,
      password,
    })
    return data
  } catch (err) {
    console.error(err)
    if (err instanceof Error) throw err.message
    else throw new Error('Something went wrong')
  }
}

async function login({ email, password }: RegisterProps) {
  try {
    const { data } = await axiosInstance.post<{
      email: string
      username: string
    }>('/auth/login', {
      email,
      password,
    })
    return data
  } catch (err) {
    console.error(err)
    if (err instanceof Error) throw err.message
    else throw new Error('Something went wrong')
  }
}

async function logout() {
  try {
    await axiosInstance.post('/auth/logout')
  } catch (err) {
    console.error(err)
    if (err instanceof Error) throw err.message
    else throw new Error('Something went wrong')
  }
}
