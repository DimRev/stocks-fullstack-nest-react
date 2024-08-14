import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AllStocksPage from './features/views/AllStocksPage'
import AuthLayout from './features/views/AuthLayout'
import HomePage from './features/views/HomePage'
import LoginPageObserver from './features/views/LoginPage'
import RegisterPageObserver from './features/views/RegisterPage'
import UserStockDetails from './features/views/UserStockDetails'
import UserStockPage from './features/views/UserStockPage'
import AppHeaderObserver from './features/layout/AppHeader'
import { QueryClient, QueryClientProvider } from 'react-query'
import AuthProviderObserver from './features/auth/components/AuthProvider'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={'w-dvw min-h-dvh'}>
        <BrowserRouter>
          <AuthProviderObserver>
            <AppHeaderObserver />
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
          </AuthProviderObserver>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  )
}

export default App
