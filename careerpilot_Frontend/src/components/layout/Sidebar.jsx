import { LayoutDashboard, FileText, Github, Briefcase, Sparkles, LogOut, Compass, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ isOpen, onClose, activeSection = 'dashboard' }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('loggedInUser'));

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const navItems = [
    { id: 'dashboard-top', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'resume-section', label: 'Resume ATS', icon: FileText },
    { id: 'github-section', label: 'GitHub Evaluation', icon: Github },
    { id: 'ai-section', label: 'AI Insights', icon: Sparkles },
    { id: 'jobs-section', label: 'Job Tracker', icon: Briefcase },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      if (onClose) onClose(); // Close mobile drawer after clicking
    }
  };

  return (
    <>
      {/* Mobile Backdrop Blur Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
        />
      )}

      {/* Sidebar Navigation Pane */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 border-r border-slate-100/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between shrink-0 z-50 transition-transform duration-300 ease-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-8">
          
          {/* Brand Logo & Mobile Close Trigger */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-500/20">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-black text-slate-800 dark:text-slate-100 text-base tracking-tight">CareerPilot</h1>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">AI Platform</p>
              </div>
            </div>
            {/* Close Button on Mobile */}
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-850 text-slate-400 dark:text-slate-500 md:hidden cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="w-full flex items-center gap-3 px-3 py-3 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 rounded-xl transition-all duration-200 text-xs font-bold text-left cursor-pointer"
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User profile actions at the bottom */}
        <div className="border-t border-slate-50 dark:border-slate-800/50 pt-5 space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300 text-xs uppercase border border-slate-200/50 dark:border-slate-700/50">
              {user?.name?.charAt(0) || user?.fullName?.charAt(0) || 'U'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                {user?.name || user?.fullName || 'User'}
              </p>
              <p className="text-[10px] text-slate-450 dark:text-slate-500 truncate">
                {user?.email}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-400 dark:text-slate-500 hover:text-rose-500 dark:hover:text-rose-450 hover:bg-rose-50/30 dark:hover:bg-rose-950/20 rounded-xl transition-all duration-200 text-xs font-bold text-left cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Sign Out</span>
          </button>
        </div>

      </aside>
    </>
  );
}
