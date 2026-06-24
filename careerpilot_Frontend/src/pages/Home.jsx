import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Compass, FileText, Github, Sparkles, Briefcase, ArrowRight, Sun, Moon, Menu, X, CheckCircle2, Shield, Star } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const features = [
    {
      title: 'Resume ATS Optimizer',
      description: 'Scan your resume against modern placement standard keyword lists to compute compatibility match rates instantly.',
      icon: FileText,
      color: 'text-blue-500 bg-blue-50/50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/30'
    },
    {
      title: 'GitHub Profile Analyzer',
      description: 'Evaluate repository numbers, follower indexes, and overall code quality scores to showcase development capabilities.',
      icon: Github,
      color: 'text-purple-500 bg-purple-50/50 dark:bg-purple-950/20 border-purple-100 dark:border-purple-900/30'
    },
    {
      title: 'AI Career Co-Pilot',
      description: 'Receive deep-learning-driven suggestions containing targeted milestones to polish ATS scores and profile presence.',
      icon: Sparkles,
      color: 'text-cyan-500 bg-cyan-50/50 dark:bg-cyan-950/20 border-cyan-100 dark:border-cyan-900/30'
    },
    {
      title: 'Job Hunt Tracker',
      description: 'Organize applications dynamically inside a beautiful timeline sorting Pending, Interviewed, and Selected states.',
      icon: Briefcase,
      color: 'text-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-100 dark:border-indigo-900/30'
    }
  ];

  return (
    <div className="bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen font-sans transition-colors duration-300 relative overflow-hidden flex flex-col justify-between">
      
      {/* Top Navbar */}
      <nav className="border-b border-slate-100 dark:border-slate-900 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 w-full transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-black text-slate-900 dark:text-white text-lg tracking-tight leading-none">CareerPilot</h1>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-extrabold uppercase tracking-wider block mt-1">AI Career Agent</span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600 dark:text-slate-350">
            <a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</a>
            <a href="#recruiter-info" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Recruiters</a>
            <a href="https://github.com/Shivamkumarjha961/CareerPilot" target="_blank" rel="noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Repository</a>
          </div>

          <div className="flex items-center gap-3.5">
            {/* Theme Selector */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 shadow-sm cursor-pointer transition-all duration-200"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Auth Buttons */}
            {user ? (
              <Link
                to="/dashboard"
                className="bg-slate-900 hover:bg-slate-850 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-900 font-extrabold px-5 py-2.5 rounded-xl transition-all duration-200 text-xs shadow-sm flex items-center gap-1.5"
              >
                <span>Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-slate-700 dark:text-slate-300 font-extrabold hover:text-blue-600 dark:hover:text-blue-450 px-4 py-2.5 text-xs transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold px-5 py-2.5 rounded-xl transition-all duration-200 text-xs shadow-md shadow-blue-500/10"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:bg-slate-50 md:hidden cursor-pointer"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-100 dark:border-slate-850 bg-white dark:bg-slate-900 p-6 flex flex-col gap-4 text-sm font-bold text-slate-700 dark:text-slate-350 animate-fadeIn">
            <a href="#features" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600">Features</a>
            <a href="#recruiter-info" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600">Recruiters</a>
            <a href="https://github.com/Shivamkumarjha961/CareerPilot" target="_blank" rel="noreferrer" className="hover:text-blue-600">Repository</a>
            {!user && (
              <div className="flex flex-col gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-center py-2.5 hover:text-blue-650">Login</Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)} className="bg-gradient-to-r from-blue-600 to-indigo-650 text-white text-center py-3 rounded-xl shadow-md">Register</Link>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-16 md:pt-24 pb-16 w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/5 dark:bg-blue-950/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        
        {/* Hero Left Column */}
        <div className="md:col-span-7 space-y-6 md:space-y-7 text-left">
          <span className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/60 text-blue-755 dark:text-blue-300 border border-blue-100 dark:border-blue-900/40 px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            AI Placement Preparation
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.02]">
            Navigate Your Career with <span className="bg-gradient-to-r from-blue-600 to-indigo-650 dark:from-blue-450 dark:to-indigo-400 bg-clip-text text-transparent">AI Precision</span>
          </h1>
          <p className="text-base md:text-xl font-bold text-slate-700 dark:text-slate-300">
            Resume ATS optimization, GitHub repository analysis, and AI-powered insights—all inside a modern, recruiter-ready dashboard.
          </p>
          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl font-medium">
            Stop sending blind applications. CareerPilot scans your resume for target keywords, evaluates your active coding projects, generates tailored job hunt suggestions, and tracks your progress from application to offer.
          </p>

          <div className="flex gap-4.5 pt-2 flex-wrap">
            {user ? (
              <Link
                to="/dashboard"
                className="bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold px-8 py-4 rounded-xl transition-all duration-200 text-sm shadow-md shadow-blue-500/10 flex items-center gap-2 cursor-pointer"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold px-8 py-4 rounded-xl transition-all duration-200 text-sm shadow-md shadow-blue-500/10 flex items-center gap-2 cursor-pointer"
                >
                  <span>Build Profile Free</span>
                  <ArrowRight className="w-4.5 h-4.5" />
                </Link>
                <Link
                  to="/login"
                  className="bg-white hover:bg-slate-50 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-850 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-extrabold px-8 py-4 rounded-xl transition-all duration-200 text-sm shadow-md shadow-slate-100/50 dark:shadow-none cursor-pointer"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Hero Right Column */}
        <div className="md:col-span-5 flex justify-center items-center">
          <div className="relative bg-white dark:bg-slate-900 p-4.5 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-lg max-w-sm w-full transition-all duration-300 hover:scale-[1.02]">
            <img
              src="/hero_illustration_1781461710947.png"
              alt="CareerPilot Workspace Grid"
              className="w-full h-auto rounded-2xl object-cover dark:opacity-85"
            />
            <div className="absolute -bottom-3 -right-3 bg-slate-900 text-white dark:bg-white dark:text-slate-950 p-3 rounded-xl border border-slate-750 dark:border-slate-200 shadow-md flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
              <span className="text-[10px] font-black uppercase tracking-wider">Recruiter Staging Ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-16 w-full border-t border-slate-100 dark:border-slate-900 scroll-mt-12">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">Workspace Capabilities</h2>
          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-semibold max-w-xl mx-auto">
            CareerPilot bundles four high-fidelity analytical modules to help prepare candidates for interviews and evaluate profiles.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 shadow-sm"
              >
                <div className="space-y-4">
                  <div className={`p-3 rounded-xl border w-fit shrink-0 ${feat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base text-left">{feat.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-350 leading-relaxed text-left font-medium">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recruiter portal staging */}
      <section id="recruiter-info" className="max-w-6xl mx-auto px-6 py-16 w-full border-t border-slate-100 dark:border-slate-900 scroll-mt-12">
        <div className="bg-gradient-to-tr from-blue-50 to-indigo-50/50 dark:from-slate-900 dark:to-slate-900/60 rounded-3xl p-8 md:p-12 border border-slate-200/50 dark:border-slate-800/80 flex flex-col md:flex-row justify-between items-center gap-8 text-left relative overflow-hidden">
          <div className="space-y-4 max-w-2xl relative z-10">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
              <Star className="w-5 h-5 fill-current" />
              <span className="text-xs font-black uppercase tracking-wider">Recruiter-Ready Workspace</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">Are you a Hiring Manager or Recruiter?</h3>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              We staging-optimized this workspace specifically for candidates portfolios. Sign in using the credentials to review code structures, active application history, or run live resume scans.
            </p>
            <div className="flex items-center gap-4 flex-wrap text-xs font-bold text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> No email signup needed to review</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Fully simulated MERN pipelines</span>
            </div>
          </div>
          <div className="shrink-0 relative z-10">
            <Link
              to="/login"
              className="bg-slate-900 hover:bg-slate-850 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-900 font-extrabold px-8 py-4 rounded-xl transition-all duration-200 text-sm shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <span>Test Portal credentials</span>
              <ArrowRight className="w-4.5 h-4.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 dark:border-slate-900 py-8 px-6 bg-white dark:bg-slate-950/30 w-full transition-colors duration-300">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-400 dark:text-slate-500">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded bg-blue-600 text-white">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <span className="text-slate-900 dark:text-white">CareerPilot AI &copy; 2026.</span>
          </div>
          <div className="flex gap-6">
            <span>Built with React + Tailwind v4 + MERN</span>
            <a href="https://github.com/Shivamkumarjha961/CareerPilot" target="_blank" rel="noreferrer" className="hover:text-blue-500">GitHub Source</a>
          </div>
        </div>
      </footer>

      {/* Soft gradient blur circles */}
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/5 to-indigo-500/5 dark:from-blue-950/10 dark:to-indigo-950/10 rounded-full blur-3xl pointer-events-none -mb-80 z-0" />
      <div className="fixed bottom-0 left-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-purple-500/5 to-pink-500/5 dark:from-purple-950/10 dark:to-pink-950/10 rounded-full blur-3xl pointer-events-none -mb-60 z-0" />
      
    </div>
  );
}
