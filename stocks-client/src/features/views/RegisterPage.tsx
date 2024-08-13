import { useState } from 'react'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { authService } from '../auth/services/auth.service'

const RegisterSchema = z.object({
  email: z.string().email('Invalid email'),
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
})

function RegisterPage() {
  const [formState, setFormState] = useState({
    email: '',
    username: '',
    password: '',
  })
  const [error, setError] = useState('')

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
      const parsed = RegisterSchema.parse(formState)
      const data = await authService.register(parsed)
      console.log(data)
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message)
        return
      } else if (err instanceof Error) {
        setError(err.message)
        return
      }
      console.log(formState)
    }
  }

  return (
    <div className="flex justify-center items-center px-4 h-full">
      <div className="px-2 py-4 border rounded-md">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4 w-lg">
          <div className="flex gap-4">
            <label htmlFor="email">Email</label>
            <input
              className="border"
              type="text"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-4">
            <label htmlFor="email">Username</label>
            <input
              className="border"
              type="text"
              id="username"
              name="username"
              value={formState.username}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-4">
            <label htmlFor="password">Password</label>
            <input
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
            Already have an account?{' '}
            <Link to="/auth/login" className="text-blue-500 underline">
              Login
            </Link>
          </p>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
