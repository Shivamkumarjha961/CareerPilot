import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';
import JobCard from './JobCard';
import ReminderCard from '../dashboard/ReminderCard';

export default function JobTracker({
  jobs,
  refreshJobs,
  loading,
}) {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('Pending');
  const [date, setDate] = useState('');

  const addJob = async () => {
    if (!company || !role || !date) {
      alert('Please fill all fields');
      return;
    }

    try {
      const user = JSON.parse(
        localStorage.getItem('loggedInUser')
      );

      console.log('Logged User:', user);

      if (!user || !user.id) {
        alert('User ID not found. Please login again.');
        return;
      }

      const response = await axios.post(
        `${API_URL}/jobs`,
        {
          user: user.id,
          company,
          role,
          status,
          date,
        }
      );

      console.log('Job Added:', response.data);

      if (refreshJobs) {
        await refreshJobs();
      }

      setCompany('');
      setRole('');
      setStatus('Pending');
      setDate('');
    } catch (error) {
      console.error(
        'Error adding job:',
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
          'Failed to add job'
      );
    }
  };

  const deleteJob = async (jobId) => {
    try {
      await axios.delete(
        `${API_URL}/jobs/${jobId}`
      );

      if (refreshJobs) {
        await refreshJobs();
      }
    } catch (error) {
      console.error('Delete Error:', error);
    }
  };

  const updateStatus = async (jobId, newStatus) => {
    try {
      await axios.put(
        `${API_URL}/jobs/${jobId}`,
        {
          status: newStatus,
        }
      );

      if (refreshJobs) {
        await refreshJobs();
      }
    } catch (error) {
      console.error('Update Error:', error);
    }
  };

  const sortedJobs = [...jobs].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="text-left">
          <h2 className="font-extrabold text-lg text-slate-900 dark:text-white">Job Application Tracker</h2>
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Keep track of your active job hunt</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3.5 mb-8">
        <input
          className="border border-slate-200 dark:border-slate-800 focus:border-slate-400 dark:focus:border-slate-700 focus:ring-2 focus:ring-slate-100 dark:focus:ring-slate-900/30 p-3.5 rounded-xl outline-none text-sm font-semibold text-slate-855 dark:text-slate-200 bg-white dark:bg-slate-950 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-655"
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          className="border border-slate-200 dark:border-slate-800 focus:border-slate-400 dark:focus:border-slate-700 focus:ring-2 focus:ring-slate-100 dark:focus:ring-slate-900/30 p-3.5 rounded-xl outline-none text-sm font-semibold text-slate-855 dark:text-slate-200 bg-white dark:bg-slate-950 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-655"
          placeholder="Role / Title"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <input
          type="date"
          className="border border-slate-200 dark:border-slate-800 focus:border-slate-400 dark:focus:border-slate-700 focus:ring-2 focus:ring-slate-100 dark:focus:ring-slate-900/30 p-3.5 rounded-xl outline-none text-sm font-semibold text-slate-855 dark:text-slate-200 bg-white dark:bg-slate-950 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-655"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <select
          className="border border-slate-200 dark:border-slate-800 focus:border-slate-400 dark:focus:border-slate-700 focus:ring-2 focus:ring-slate-100 dark:focus:ring-slate-900/30 p-3.5 rounded-xl outline-none text-sm font-semibold text-slate-855 dark:text-slate-200 bg-white dark:bg-slate-950 transition-all cursor-pointer"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Pending" className="text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900">Pending</option>
          <option value="Applied" className="text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900">Applied</option>
          <option value="Interview" className="text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900">Interview</option>
          <option value="Selected" className="text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900">Selected</option>
          <option value="Rejected" className="text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900">Rejected</option>
        </select>

        <button
          onClick={addJob}
          className="bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold py-3.5 px-6 rounded-xl transition-all duration-200 text-sm shadow-md shadow-blue-500/10 cursor-pointer"
        >
          Add Job
        </button>
      </div>

      <ReminderCard jobs={jobs} />

      <div className="mt-8">
        <h3 className="text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 text-left">
          Job Applications ({sortedJobs.length})
        </h3>
        <div className="grid gap-3.5">
          {loading ? (
            <>
              <div className="bg-white dark:bg-slate-900 p-4.5 rounded-2xl border border-slate-100 dark:border-slate-800 flex justify-between items-center animate-pulse">
                <div className="flex items-center gap-4.5">
                  <div className="w-11 h-11 bg-slate-200 dark:bg-slate-800 rounded-full shrink-0" />
                  <div className="space-y-2 text-left">
                    <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded w-28" />
                    <div className="h-2.5 bg-slate-200 dark:bg-slate-800 rounded w-20" />
                  </div>
                </div>
                <div className="flex items-center gap-4.5">
                  <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded w-16 hidden sm:block" />
                  <div className="h-6 bg-slate-250 dark:bg-slate-800 rounded-full w-16" />
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-4.5 rounded-2xl border border-slate-100 dark:border-slate-800 flex justify-between items-center animate-pulse">
                <div className="flex items-center gap-4.5">
                  <div className="w-11 h-11 bg-slate-200 dark:bg-slate-800 rounded-full shrink-0" />
                  <div className="space-y-2 text-left">
                    <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded w-24" />
                    <div className="h-2.5 bg-slate-200 dark:bg-slate-800 rounded w-16" />
                  </div>
                </div>
                <div className="flex items-center gap-4.5">
                  <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded w-16 hidden sm:block" />
                  <div className="h-6 bg-slate-250 dark:bg-slate-800 rounded-full w-16" />
                </div>
              </div>
            </>
          ) : sortedJobs.length > 0 ? (
            sortedJobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                onDelete={() => deleteJob(job._id)}
                onUpdate={(newStatus) =>
                  updateStatus(job._id, newStatus)
                }
              />
            ))
          ) : (
            <div className="text-center py-12 bg-slate-50/50 dark:bg-slate-850/15 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-550">
                No jobs available. Please add a job.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

