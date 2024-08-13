import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './features/views/HomePage'
import AppHeader from './features/layout/AppHeader'
import AuthLayout from './features/views/AuthLayout'
import LoginPage from './features/views/LoginPage'
import RegisterPage from './features/views/RegisterPage'
import AllStocksPage from './features/views/AllStocksPage'
import UserStockPage from './features/views/UserStockPage'

function App() {
  return (
    <div className="w-dvw min-h-dvh">
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
          <Route path="/portfolio" element={<UserStockPage />} />
          <Route path="/stocks" element={<AllStocksPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
