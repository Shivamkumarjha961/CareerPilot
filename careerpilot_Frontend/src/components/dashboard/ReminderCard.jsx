import { Clock } from 'lucide-react';

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
    Pending: 'text-amber-600 bg-amber-50 border-amber-100',
    Applied: 'text-blue-600 bg-blue-50 border-blue-100',
    Interview: 'text-purple-600 bg-purple-50 border-purple-100',
    Selected: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    Rejected: 'text-rose-600 bg-rose-50 border-rose-100',
  };

  return (
    <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl shadow-sm mb-6 transition-all duration-350 hover:shadow-md hover:border-slate-200/60">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="w-4 h-4 text-purple-500 animate-pulse" />
        <h2 className="font-bold text-xs uppercase tracking-wider text-slate-400">Upcoming Reminder</h2>
      </div>

      {nearestJob ? (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
          <div className="space-y-1">
            <p className="text-sm font-bold text-slate-800">
              {nearestJob.company} - {nearestJob.role}
            </p>
            <p className="text-xs text-slate-500 font-medium">
              Application/Interview on {nearestJob.date}
            </p>
          </div>
          <div className="flex items-center">
            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
              statusColor[nearestJob.status] || 'text-slate-650 bg-slate-50 border-slate-150'
            }`}>
              Status: {nearestJob.status}
            </span>
          </div>
        </div>
      ) : (
        <div className="bg-white p-4 rounded-xl border border-slate-100 text-center shadow-sm">
          <p className="text-xs font-semibold text-slate-400">No upcoming reminders.</p>
        </div>
      )}
    </div>
  );
}