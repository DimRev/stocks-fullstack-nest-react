import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './features/views/HomePage'
import AppHeader from './features/layout/AppHeader'
import AuthLayout from './features/views/AuthLayout'
import AllStocksPage from './features/views/AllStocksPage'
import UserStockPage from './features/views/UserStockPage'
import RegisterPageObserver from './features/views/RegisterPage'
import LoginPageObserver from './features/views/LoginPage'
import UserStockDetails from './features/views/UserStockDetails'

function App() {
  return (
    <div className="w-dvw min-h-dvh">
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPageObserver />} />
            <Route path="register" element={<RegisterPageObserver />} />
          </Route>
          <Route path="/portfolio/*" element={<UserStockPage />} />
          <Route path="/portfolio/:symbol" element={<UserStockDetails />} />
          <Route path="/stocks" element={<AllStocksPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
