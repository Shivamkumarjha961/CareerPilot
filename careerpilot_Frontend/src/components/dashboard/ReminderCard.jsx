import { Bell } from 'lucide-react';

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
    Pending: 'text-amber-750 bg-amber-50 border-amber-100',
    Applied: 'text-white bg-blue-600 border-blue-600',
    Interview: 'text-white bg-purple-600 border-purple-600',
    Selected: 'text-white bg-emerald-600 border-emerald-600',
    Rejected: 'text-white bg-rose-600 border-rose-600',
  };

  return (
    <div className="bg-white border border-slate-100 border-l-4 border-l-blue-600 p-5 rounded-2xl shadow-sm mb-6 transition-all duration-300 hover:shadow-md hover:border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0">
          <Bell className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Upcoming Reminder</h2>
          {nearestJob ? (
            <>
              <p className="text-sm font-extrabold text-slate-800 mt-1">
                {nearestJob.company} &mdash; {nearestJob.role}
              </p>
              <p className="text-xs text-slate-450 mt-0.5">
                Application/Interview on {nearestJob.date}
              </p>
            </>
          ) : (
            <p className="text-xs font-semibold text-slate-400 mt-1">No upcoming reminders.</p>
          )}
        </div>
      </div>

      {nearestJob && (
        <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border shrink-0 text-center ${
          statusColor[nearestJob.status] || 'text-slate-650 bg-slate-50 border-slate-150'
        }`}>
          {nearestJob.status}
        </span>
      )}
    </div>
  );
}