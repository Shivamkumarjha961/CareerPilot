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
    <div>
      <div className="grid md:grid-cols-5 gap-4 mb-6">
        <input
          className="border p-2 rounded-lg"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          className="border p-2 rounded-lg"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <input
          type="date"
          className="border p-2 rounded-lg"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <select
          className="border p-2 rounded-lg"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Pending</option>
          <option>Interview</option>
          <option>Selected</option>
          <option>Rejected</option>
        </select>

        <button
          onClick={addJob}
          className="bg-black text-white rounded-lg p-2"
        >
          Add Job
        </button>
      </div>

      <ReminderCard jobs={jobs} />

      <h2 className="text-xl font-semibold mb-4 text-slate-800">Job List</h2>
      <div className="grid gap-5">
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
          <p className="text-center text-slate-500 py-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
            No jobs available. Please add a job.
          </p>
        )}
      </div>
    </div>
  );
}

