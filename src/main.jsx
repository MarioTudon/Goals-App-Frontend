import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import App from './App.jsx'
import './output.css'
import GoalsContextProvider from './context/GoalsContext.jsx'
import AuthContextProvider from './context/AuthContext.jsx'
import NotFound from './components/app/NotFound'

createRoot(document.getElementById('root')).render(
  < StrictMode >
    <BrowserRouter>
      <AuthContextProvider>
        <GoalsContextProvider>
          <Routes>
            <Route path="/*" element={<App />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </GoalsContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode >,
)
