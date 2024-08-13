import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { authService } from '../auth/services/auth.service'
import { observer } from 'mobx-react'
import store from '../../lib/store'
import { Button, Input } from 'antd'

const LoginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
})

function LoginPage() {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      const parsed = LoginSchema.parse(formState)
      const data = await authService.login(parsed)
      if (data) {
        store.setMiniUser({ email: data.email, username: data.username })
        store.setUserStockSymbols(data.stockSymbols)
      }
      navigate('/')
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message)
        return
      } else if (err instanceof Error) {
        setError(err.message)
        return
      }
    }
  }

  return (
    <div className="flex justify-center items-center px-4 h-full">
      <div className="px-2 py-4 border rounded-md w-[400px]">
        <form onSubmit={handleSubmit} className="gap-4 w-lg">
          <div className="grid grid-cols-[2fr_6fr] px-2 py-2">
            <label htmlFor="email">Email</label>
            <Input
              className="border"
              type="text"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-[2fr_6fr] px-2 py-2">
            <label htmlFor="password">Password</label>
            <Input
              className="border"
              type="password"
              id="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <p>
            Don't have an account?{' '}
            <Link to="/auth/register" className="text-blue-500 underline">
              Register
            </Link>
          </p>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </form>
      </div>
    </div>
  )
}

const LoginPageObserver = observer(LoginPage)
export default LoginPageObserver
