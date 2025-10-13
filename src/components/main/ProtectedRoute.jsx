import { useNavigate } from 'react-router'
import { useEffect } from 'react'

const ProtectedRoute = ({ element: Element, isAuthenticated }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/Login')
    }
  }, [isAuthenticated, navigate])

  return isAuthenticated ? <Element /> : null
}

export default ProtectedRoute
