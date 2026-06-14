export default function ReminderCard({ jobs = [] }) {
  // Filter for jobs with a date that is today or in the future
  const upcomingJobs = jobs.filter((job) => {
    if (!job.date) return false;
    const jobDate = new Date(job.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today
    return jobDate >= today;
  });

  // Sort upcoming jobs by date ascending (nearest first)
  upcomingJobs.sort((a, b) => new Date(a.date) - new Date(b.date));

  const nearestJob = upcomingJobs[0];

  const statusColor = {
    Pending: 'bg-yellow-100 text-yellow-700',
    Interview: 'bg-blue-100 text-blue-700',
    Selected: 'bg-green-100 text-green-700',
    Rejected: 'bg-red-100 text-red-700',
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
      <h2 className="font-semibold mb-4 text-xl">Upcoming Reminder</h2>
      {nearestJob ? (
        <div>
          <p className="text-sm text-slate-700 font-medium">
            🔔 {nearestJob.company} - {nearestJob.role}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Date: {new Date(nearestJob.date).toLocaleDateString(undefined, {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <span
            className={`inline-block mt-4 px-3 py-1 rounded-full text-xs font-semibold ${
              statusColor[nearestJob.status] || 'bg-slate-100 text-slate-700'
            }`}
          >
            {nearestJob.status}
          </span>
        </div>
      ) : (
        <p className="text-sm text-slate-500">No upcoming reminders.</p>
      )}
    </div>
  );
}