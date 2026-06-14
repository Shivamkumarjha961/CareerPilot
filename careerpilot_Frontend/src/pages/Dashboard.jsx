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
    <div className="bg-[#F8FAFC] text-slate-800 min-h-screen flex flex-col font-sans">
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full space-y-10 animate-fadeIn">
        
        <Navbar jobs={jobs} />

        {/* Hero Section */}
        <div className="bg-white border border-slate-100/80 rounded-3xl p-8 md:p-14 shadow-sm relative overflow-hidden">
          {/* Subtle glow highlights */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-indigo-50/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-5">
            <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-100/50 px-3.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
              AI Career Preparation Engine
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
              Career<span className="bg-gradient-to-r from-blue-600 to-indigo-650 bg-clip-text text-transparent">Pilot</span>
            </h1>
            <p className="text-lg md:text-xl font-bold text-slate-700 tracking-tight">
              AI-Powered Placement Preparation Platform
            </p>
            <p className="text-sm md:text-base text-slate-500 leading-relaxed max-w-2xl">
              Track applications, analyze resumes, evaluate GitHub profiles, and get AI-powered career insights. Let our smart agents optimize your pipeline and guide you to your dream job.
            </p>
            <div className="flex gap-3 pt-2 flex-wrap">
              <button
                onClick={() => document.getElementById('resume-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3.5 rounded-xl transition-all duration-200 text-xs shadow-sm hover:shadow shadow-slate-900/10 cursor-pointer flex items-center gap-1.5"
              >
                Upload Resume
              </button>
              <button
                onClick={() => document.getElementById('github-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 font-bold px-6 py-3.5 rounded-xl transition-all duration-200 text-xs shadow-sm cursor-pointer"
              >
                Analyze GitHub
              </button>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div id="resume-section" className="scroll-mt-6">
            <ResumeUpload
              setAtsScore={setAtsScore}
              setResumeText={setResumeText}
            />
          </div>

          <div id="github-section" className="scroll-mt-6">
            <GithubAnalyzer
              setGithubScore={setGithubScore}
              setGithubData={setGithubData}
            />
          </div>

          <div className="scroll-mt-6">
            <AISuggestions
              resumeText={resumeText}
              githubData={githubData}
            />
          </div>
        </div>

        {/* Job Applications Tracker Form and List */}
        <div className="w-full">
          {!loading && (
            <JobTracker
              jobs={jobs}
              setJobs={setJobs}
              refreshJobs={fetchJobs}
            />
          )}
        </div>

        {/* Activity & Scan History */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <ResumeHistory />
          <GithubHistory />
        </div>

      </main>
    </div>
  );
}
