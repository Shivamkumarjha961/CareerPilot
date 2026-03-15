import { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';

import StatsCards from '../components/dashboard/StatsCards';
import ReminderCard from '../components/dashboard/ReminderCard';
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

  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem('jobs');

    return savedJobs
      ? JSON.parse(savedJobs)
      : [
          {
            company: 'Google',
            role: 'Frontend Developer',
            status: 'Applied',
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  return (
    <div className="bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100 text-black min-h-screen flex">
      <main className="flex-1 p-8 md:p-10">

        <Navbar jobs={jobs} />

        <div className="mt-8">
          <StatsCards
            atsScore={atsScore}
            githubScore={githubScore}
            applications={jobs.length}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6 my-8">
          <ResumeUpload
            setAtsScore={setAtsScore}
            setResumeText={setResumeText}
          />

          <GithubAnalyzer
            setGithubScore={setGithubScore}
            setGithubData={setGithubData}
          />

          <AISuggestions
            resumeText={resumeText}
            githubData={githubData}
          />
        </div>

        <div className="mb-8">
          <ReminderCard />
        </div>

        <div className="mb-8">
          <JobTracker
            jobs={jobs}
            setJobs={setJobs}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <ResumeHistory />
          <GithubHistory />
        </div>

      </main>
    </div>
  );
}