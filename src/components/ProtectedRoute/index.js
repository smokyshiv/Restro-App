import { Outlet, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = () => {
  const jwtToken = Cookies.get('jwt_token');

  if (!jwtToken) {
    // Redirect to login if no token is present
    return <Navigate to="/login" />;
  }

  // Render the child routes if token is present
  return <Outlet />;
};

export default ProtectedRoute;
