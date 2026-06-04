import { useState } from 'react';
import { Bell, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ jobs }) {
  const today = new Date().toLocaleDateString();

  const [showProfile, setShowProfile] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('loggedInUser'));

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="flex justify-between items-center mb-8 relative">
      <div>
        <h1 className="text-4xl font-bold">AI Career Dashboard</h1>
        <p className="text-slate-500">
          Complete placement preparation platform
        </p>
      </div>

      <div className="flex items-center gap-4 relative">
        <p className="text-sm text-slate-500">{today}</p>

        <div className="relative">
          <Bell
            className="w-5 h-5 cursor-pointer"
            onClick={() => {
              setShowNotification(!showNotification);
              setShowProfile(false);
            }}
          />

          {showNotification && (
            <div className="absolute right-0 mt-3 bg-white shadow-lg rounded-xl p-4 w-72 z-50">
              {jobs.slice(0, 3).map((job, index) => (
                <p key={index} className="text-sm mb-2">
                  🔔 {job.company} - {job.role}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <UserCircle
            className="w-7 h-7 cursor-pointer"
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotification(false);
            }}
          />

          {showProfile && (
            <div className="absolute right-0 mt-3 bg-white shadow-lg rounded-xl p-4 w-56 z-50">
              <p className="font-semibold text-sm">
                {user?.name || user?.fullName || 'User'}
              </p>

              <p className="text-xs text-slate-500 mt-1">
                {user?.email}
              </p>

              <hr className="my-3" />

              <p
                onClick={handleLogout}
                className="text-sm cursor-pointer hover:text-red-500"
              >
                Logout
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}