import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './features/views/HomePage'
import AppHeader from './features/layout/AppHeader'

function App() {
  return (
    <div className="w-dvw min-h-dvh">
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
