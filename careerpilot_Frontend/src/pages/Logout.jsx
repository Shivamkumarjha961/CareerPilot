import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/users/logout', {
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