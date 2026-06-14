import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';
import JobCard from './JobCard';
import ReminderCard from '../dashboard/ReminderCard';

export default function JobTracker({
  jobs,
  refreshJobs,
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
    <div className="bg-white p-6 rounded-3xl shadow-md border border-slate-100/80">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-bold text-lg text-slate-800">Job Application Tracker</h2>
          <p className="text-xs text-slate-400">Keep track of your active job hunt</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        <input
          className="border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200/50 p-2.5 rounded-xl outline-none text-xs text-slate-700 transition-all placeholder:text-slate-400"
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          className="border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200/50 p-2.5 rounded-xl outline-none text-xs text-slate-700 transition-all placeholder:text-slate-400"
          placeholder="Role / Title"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <input
          type="date"
          className="border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200/50 p-2.5 rounded-xl outline-none text-xs text-slate-700 transition-all placeholder:text-slate-400"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <select
          className="border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200/50 p-2.5 rounded-xl outline-none text-xs text-slate-700 transition-all cursor-pointer"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Selected">Selected</option>
          <option value="Rejected">Rejected</option>
        </select>

        <button
          onClick={addJob}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 text-xs shadow-sm shadow-blue-100 hover:shadow-blue-200"
        >
          Add Job
        </button>
      </div>

      <ReminderCard jobs={jobs} />

      <div className="mt-8">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
          Job Applications ({sortedJobs.length})
        </h3>
        <div className="grid gap-3.5">
          {sortedJobs.length > 0 ? (
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
            <div className="text-center py-12 bg-slate-50/50 border border-dashed border-slate-200 rounded-2xl">
              <p className="text-xs font-semibold text-slate-450">
                No jobs available. Please add a job.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

