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
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8 animate-fadeIn">
        
        <Navbar jobs={jobs} />

        {/* Hero Banner Section */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white shadow-md relative overflow-hidden">
          <div className="absolute inset-0 bg-white/[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-block bg-white/10 backdrop-blur-md text-white border border-white/20 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase">
              Career Management Dashboard
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              CareerPilot
            </h1>
            <p className="text-lg md:text-xl font-medium text-blue-100/90">
              AI-Powered Placement Preparation Platform
            </p>
            <p className="text-sm md:text-base text-white/80 leading-relaxed">
              Track applications, analyze resumes, evaluate GitHub profiles, and get AI-powered career insights. Let our smart agents optimize your pipeline and guide you to your dream job.
            </p>
            <div className="flex gap-3 pt-3 flex-wrap">
              <button
                onClick={() => document.getElementById('resume-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-blue-600 hover:bg-slate-50 font-bold px-6 py-3 rounded-xl transition-all duration-200 text-xs shadow-sm cursor-pointer"
              >
                Upload Resume
              </button>
              <button
                onClick={() => document.getElementById('github-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/10 hover:bg-white/25 text-white border border-white/20 font-semibold px-6 py-3 rounded-xl transition-all duration-200 text-xs cursor-pointer"
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
