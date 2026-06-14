import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/users/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      localStorage.removeItem('token');
      localStorage.removeItem('loggedInUser');
      localStorage.removeItem('jobs');

      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm mt-3 cursor-pointer hover:text-red-500"
    >
      Logout
    </button>
  );
}