import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const user = localStorage.getItem('loggedInUser');
  
  if (!user) {
    // If not authenticated, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child component (e.g. Dashboard)
  return children;
}
