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
    Pending: 'text-amber-750 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-100 dark:border-amber-900/30',
    Applied: 'text-white bg-blue-600 dark:bg-blue-500 border-blue-600 dark:border-blue-500',
    Interview: 'text-white bg-purple-600 dark:bg-purple-500 border-purple-600 dark:border-purple-500',
    Selected: 'text-white bg-emerald-600 dark:bg-emerald-500 border-emerald-600 dark:border-emerald-500',
    Rejected: 'text-white bg-rose-600 dark:bg-rose-500 border-rose-600 dark:border-rose-500',
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 border-l-4 border-l-blue-600 dark:border-l-blue-500 p-5 rounded-2xl shadow-sm mb-6 transition-all duration-300 hover:shadow-md hover:border-slate-200/60 dark:hover:border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl shrink-0">
          <Bell className="w-5 h-5" />
        </div>
        <div className="text-left">
          <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Upcoming Reminder</h2>
          {nearestJob ? (
            <>
              <p className="text-sm font-extrabold text-slate-800 dark:text-slate-100 mt-1">
                {nearestJob.company} &mdash; {nearestJob.role}
              </p>
              <p className="text-xs text-slate-450 dark:text-slate-500 mt-0.5">
                Application/Interview on {nearestJob.date}
              </p>
            </>
          ) : (
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-1">No upcoming reminders.</p>
          )}
        </div>
      </div>

      {nearestJob && (
        <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border shrink-0 text-center ${
          statusColor[nearestJob.status] || 'text-slate-650 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 border-slate-150 dark:border-slate-750'
        }`}>
          {nearestJob.status}
        </span>
      )}
    </div>
  );
}