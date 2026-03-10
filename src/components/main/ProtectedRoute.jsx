
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, isAuthenticated }) => {
  const location = useLocation();

  if (isAuthenticated) {
    return <Element />;
  }

  // Preserva la ruta original en state.from
  return <Navigate to="/Login" replace state={{ from: location }} />;
};

export default ProtectedRoute;
