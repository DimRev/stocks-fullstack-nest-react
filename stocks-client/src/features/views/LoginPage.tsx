import { useState } from 'react'
import { Link } from 'react-router-dom'
import { z } from 'zod'

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

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      const parsed = LoginSchema.parse(formState)
      console.log(parsed)
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message)
        return
      }
    }
    console.log(formState)
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
            Don't have an account?{' '}
            <Link to="/auth/register" className="text-blue-500 underline">
              Register
            </Link>
          </p>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
