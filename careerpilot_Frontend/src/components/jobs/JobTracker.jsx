import { useState } from 'react';
import JobCard from './JobCard';

export default function JobTracker({ jobs, setJobs }) {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('Pending');
  const [date, setDate] = useState('');

  const addJob = () => {
    if (!company || !role || !date) return;

    const newJob = {
      company,
      role,
      status,
      date,
    };

    setJobs([...jobs, newJob]);

    setCompany('');
    setRole('');
    setStatus('Pending');
    setDate('');
  };

  const deleteJob = (index) => {
    setJobs(jobs.filter((_, i) => i !== index));
  };

  const updateStatus = (index, newStatus) => {
    const updated = [...jobs];
    updated[index].status = newStatus;
    setJobs(updated);
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
          className="bg-black text-white rounded-lg"
        >
          Add Job
        </button>
      </div>

      <div className="grid gap-5">
        {sortedJobs.map((job, index) => (
          <JobCard
            key={index}
            job={job}
            onDelete={() => deleteJob(index)}
            onUpdate={(newStatus) => updateStatus(index, newStatus)}
          />
        ))}
      </div>
    </div>
  );
}