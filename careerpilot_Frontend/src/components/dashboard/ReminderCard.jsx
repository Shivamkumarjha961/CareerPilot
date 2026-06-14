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

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
      <h2 className="font-semibold mb-4 text-xl text-slate-800">Upcoming Reminder</h2>
      {nearestJob ? (
        <div className="space-y-1">
          <p className="text-lg font-bold text-slate-900">
            {nearestJob.company} - {nearestJob.role}
          </p>
          <p className="text-sm text-slate-600">
            Application/Interview on {nearestJob.date}
          </p>
          <p className="text-sm text-slate-700 font-medium">
            Status: <span className="font-semibold text-blue-600">{nearestJob.status}</span>
          </p>
        </div>
      ) : (
        <p className="text-sm text-slate-500">No upcoming reminders.</p>
      )}
    </div>
  );
}