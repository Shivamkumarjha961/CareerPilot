import { useState } from 'react';
import { Bell, Sun, Moon, Menu, LogOut, FileText, Briefcase, Sparkles, User, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ jobs = [], onMenuToggle, theme, onThemeToggle }) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const [showProfile, setShowProfile] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('loggedInUser'));

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <header className="flex justify-between items-center pb-4 border-b border-slate-100/80 dark:border-slate-800/80 relative">
      
      {/* Left side: Hamburger (Mobile) + Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 md:hidden cursor-pointer shrink-0 transition-colors"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">AI Prep Engine</h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-extrabold uppercase tracking-wider mt-0.5">Career Pilot Workspace</p>
        </div>
      </div>

      {/* Right side: Actions & User Info */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Date Display (Desktop only) */}
        <span className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider hidden sm:inline-block">
          {today}
        </span>

        {/* Theme Toggle */}
        <button
          onClick={onThemeToggle}
          className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 shadow-sm cursor-pointer transition-all duration-200"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotification(!showNotification);
              setShowProfile(false);
            }}
            className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 shadow-sm cursor-pointer relative transition-all duration-200"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {jobs && jobs.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
            )}
          </button>

          {showNotification && (
            <div className="absolute right-0 mt-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-2xl p-5 w-80 z-50 animate-fadeIn">
              <h3 className="text-xs font-black text-slate-900 dark:text-white mb-3.5 uppercase tracking-wider">Recent Reminders</h3>
              <div className="space-y-3 pr-1">
                {jobs && jobs.length > 0 ? (
                  jobs.slice(0, 3).map((job, index) => (
                    <div key={index} className="flex gap-3 items-start p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-850/50 transition-colors">
                      <div className="p-1.5 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-extrabold text-slate-900 dark:text-white truncate">{job.company}</p>
                        <p className="text-xs font-bold text-slate-600 dark:text-slate-350 mt-0.5">{job.role} &mdash; {job.status}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 text-center py-4">No recent job notifications</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Account / Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotification(false);
            }}
            className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 shadow-sm cursor-pointer transition-all duration-200"
            title="User Settings"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-sm uppercase shrink-0">
              {user?.name?.charAt(0) || user?.fullName?.charAt(0) || 'U'}
            </div>
            <span className="text-sm font-extrabold text-slate-800 dark:text-slate-200 hidden md:inline-block">
              {user?.name || user?.fullName || 'Account'}
            </span>
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-2xl p-5 w-64 z-50 animate-fadeIn">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800/50">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black text-sm uppercase">
                  {user?.name?.charAt(0) || user?.fullName?.charAt(0) || 'U'}
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white truncate">{user?.name || user?.fullName || 'User'}</h4>
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-450 truncate mt-0.5">{user?.email}</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 p-2.5 rounded-xl text-rose-600 dark:text-rose-450 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-sm font-extrabold text-left cursor-pointer transition-colors"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}