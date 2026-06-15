// import { useState, useEffect } from 'react';
// import Navbar from '../components/layout/Navbar';

// import StatsCards from '../components/dashboard/StatsCards';
// import ReminderCard from '../components/dashboard/ReminderCard';
// import AISuggestions from '../components/dashboard/AISuggestions';

// import ResumeUpload from '../components/resume/ResumeUpload';
// import ResumeHistory from '../components/resume/ResumeHistory';

// import GithubAnalyzer from '../components/github/GithubAnalyzer';
// import GithubHistory from '../components/github/GithubHistory';

// import JobTracker from '../components/jobs/JobTracker';

// export default function Dashboard() {
//   const [atsScore, setAtsScore] = useState(0);
//   const [githubScore, setGithubScore] = useState(0);

//   const [resumeText, setResumeText] = useState('');
//   const [githubData, setGithubData] = useState(null);

//   const [jobs, setJobs] = useState(() => {
//     const savedJobs = localStorage.getItem('jobs');

//     return savedJobs
//       ? JSON.parse(savedJobs)
//       : [
//           {
//             company: 'Google',
//             role: 'Frontend Developer',
//             status: 'Applied',
//           },
//         ];
//   });

//   useEffect(() => {
//     localStorage.setItem('jobs', JSON.stringify(jobs));
//   }, [jobs]);

//   return (
//     <div className="bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100 text-black min-h-screen flex">
//       <main className="flex-1 p-8 md:p-10">

//         <Navbar jobs={jobs} />

//         <div className="mt-8">
//           <StatsCards
//             atsScore={atsScore}
//             githubScore={githubScore}
//             applications={jobs.length}
//           />
//         </div>

//         <div className="grid md:grid-cols-3 gap-6 my-8">
//           <ResumeUpload
//             setAtsScore={setAtsScore}
//             setResumeText={setResumeText}
//           />

//           <GithubAnalyzer
//             setGithubScore={setGithubScore}
//             setGithubData={setGithubData}
//           />

//           <AISuggestions
//             resumeText={resumeText}
//             githubData={githubData}
//           />
//         </div>

//         <div className="mb-8">
//           <ReminderCard />
//         </div>

//         <div className="mb-8">
//           <JobTracker
//             jobs={jobs}
//             setJobs={setJobs}
//           />
//         </div>

//         <div className="grid md:grid-cols-2 gap-6">
//           <ResumeHistory />
//           <GithubHistory />
//         </div>

//       </main>
//     </div>
//   );
// }



import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import { LayoutDashboard, FileText, Github, Sparkles, Briefcase } from 'lucide-react';

import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import StatsCards from '../components/dashboard/StatsCards';
import CareerReadiness from '../components/dashboard/CareerReadiness';
import AISuggestions from '../components/dashboard/AISuggestions';
import ResumeUpload from '../components/resume/ResumeUpload';
import ResumeHistory from '../components/resume/ResumeHistory';
import GithubAnalyzer from '../components/github/GithubAnalyzer';
import GithubHistory from '../components/github/GithubHistory';
import JobTracker from '../components/jobs/JobTracker';

export default function Dashboard() {
  const [atsScore, setAtsScore] = useState(0);
  const [githubScore, setGithubScore] = useState(0);
  const [resumeText, setResumeText] = useState('');
  const [githubData, setGithubData] = useState(null);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const user = JSON.parse(
        localStorage.getItem('loggedInUser')
      );

      console.log('Dashboard User:', user);

      if (!user || !user.id) {
        console.log('User not found in localStorage');
        return;
      }

      const response = await axios.get(
        `${API_URL}/jobs/${user.id}`
      );

      console.log('Jobs Fetched:', response.data);

      setJobs(response.data || []);
    } catch (error) {
      console.error('Fetch Jobs Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen flex flex-col md:flex-row font-sans transition-colors duration-300">
      
      {/* Left Sidebar Navigation */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Pane */}
      <main className="flex-1 p-4 md:p-10 max-w-5xl mx-auto w-full space-y-10 md:space-y-12 animate-fadeIn pb-24 md:pb-10 pr-4 md:pr-10 relative z-10">
        
        <Navbar
          jobs={jobs}
          onMenuToggle={() => setIsSidebarOpen(true)}
          theme={theme}
          onThemeToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        />

        {/* Hero Section */}
        <div id="dashboard-top" className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-3xl p-6 md:p-14 shadow-sm relative overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-8 items-center scroll-mt-8 transition-colors duration-300">
          {/* Subtle glow highlights */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/30 dark:bg-blue-950/15 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-indigo-50/20 dark:bg-indigo-950/5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

          {/* Left Text Column */}
          <div className="relative z-10 md:col-span-7 space-y-6 md:space-y-7 text-left">
            <span className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/60 text-blue-755 dark:text-blue-300 border border-blue-100 dark:border-blue-900/40 px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              AI Career Preparation Engine
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.02]">
              Career<span className="bg-gradient-to-r from-blue-600 to-indigo-650 dark:from-blue-450 dark:to-indigo-400 bg-clip-text text-transparent">Pilot</span>
            </h1>
            <p className="text-base md:text-2xl font-black text-slate-800 dark:text-slate-200 tracking-tight">
              AI-Powered Placement Preparation Platform
            </p>
            <p className="text-sm md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl font-medium">
              Track applications, analyze resumes, evaluate GitHub profiles, and get AI-powered career insights. Let our smart agents optimize your pipeline and guide you to your dream job.
            </p>
            <div className="flex gap-4.5 pt-2 flex-wrap">
              <button
                onClick={() => document.getElementById('resume-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold px-7 py-4 rounded-xl transition-all duration-200 text-sm shadow-md shadow-blue-500/10 cursor-pointer flex items-center gap-2"
              >
                Upload Resume
              </button>
              <button
                onClick={() => document.getElementById('github-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white hover:bg-slate-50 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-850 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-extrabold px-7 py-4 rounded-xl transition-all duration-200 text-sm shadow-md shadow-slate-100/50 dark:shadow-none cursor-pointer"
              >
                Analyze GitHub
              </button>
            </div>
          </div>

          {/* Right Illustration Column */}
          <div className="relative z-10 md:col-span-5 flex justify-center items-center">
            <div className="relative bg-slate-50/50 dark:bg-slate-850/40 p-4 border border-slate-150 dark:border-slate-800 rounded-2xl shadow-inner max-w-sm w-full transition-all duration-300 hover:shadow-md">
              <img
                src="/hero_illustration_1781461710947.png"
                alt="AI Growth Grid"
                className="w-full h-auto rounded-xl object-cover dark:opacity-85"
              />
              <div className="absolute -bottom-3 -right-3 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800 shadow-md flex items-center gap-2 animate-bounce">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                <span className="text-[10px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider">AI Optimizer Live</span>
              </div>
            </div>
          </div>

        </div>

        {/* Stats Metrics Cards */}
        <div>
          <StatsCards
            atsScore={atsScore}
            githubScore={githubScore}
            applications={jobs.length}
          />
        </div>

        {/* Circular Career Readiness Indicator */}
        <div className="w-full">
          <CareerReadiness
            atsScore={atsScore}
            githubScore={githubScore}
            applications={jobs.length}
          />
        </div>

        {/* Main Workspaces: ATS, GitHub, AI */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div id="resume-section" className="scroll-mt-8">
            <ResumeUpload
              setAtsScore={setAtsScore}
              setResumeText={setResumeText}
            />
          </div>

          <div id="github-section" className="scroll-mt-8">
            <GithubAnalyzer
              setGithubScore={setGithubScore}
              setGithubData={setGithubData}
            />
          </div>

          <div id="ai-section" className="scroll-mt-8">
            <AISuggestions
              resumeText={resumeText}
              githubData={githubData}
            />
          </div>
        </div>

        {/* Job Applications Tracker Form and List */}
        <div id="jobs-section" className="scroll-mt-8">
          <JobTracker
            jobs={jobs}
            setJobs={setJobs}
            refreshJobs={fetchJobs}
            loading={loading}
          />
        </div>

        {/* Activity & Scan History */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <ResumeHistory />
          <GithubHistory />
        </div>

      </main>

      {/* Decorative bottom soft gradient mesh */}
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/5 to-indigo-500/5 dark:from-blue-950/10 dark:to-indigo-950/10 rounded-full blur-3xl pointer-events-none -mb-80 z-0" />
      <div className="fixed bottom-0 left-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-purple-500/5 to-pink-500/5 dark:from-purple-950/10 dark:to-pink-950/10 rounded-full blur-3xl pointer-events-none -mb-60 z-0" />

      {/* Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-16 md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-150 dark:border-slate-800/80 flex items-center justify-around z-30 px-2 shadow-lg transition-colors duration-300">
        <button
          onClick={() => document.getElementById('dashboard-top')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-1 text-[10px] font-extrabold text-slate-450 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard</span>
        </button>
        <button
          onClick={() => document.getElementById('resume-section')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-1 text-[10px] font-extrabold text-slate-450 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
        >
          <FileText className="w-4 h-4" />
          <span>Resume</span>
        </button>
        <button
          onClick={() => document.getElementById('github-section')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-1 text-[10px] font-extrabold text-slate-450 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
        >
          <Github className="w-4 h-4" />
          <span>GitHub</span>
        </button>
        <button
          onClick={() => document.getElementById('ai-section')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-1 text-[10px] font-extrabold text-slate-450 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>AI Insight</span>
        </button>
        <button
          onClick={() => document.getElementById('jobs-section')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-1 text-[10px] font-extrabold text-slate-450 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
        >
          <Briefcase className="w-4 h-4" />
          <span>Jobs</span>
        </button>
      </div>

    </div>
  );
}
