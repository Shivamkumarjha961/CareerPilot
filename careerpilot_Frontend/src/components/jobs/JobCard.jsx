import { Calendar, Trash2 } from 'lucide-react';

export default function JobCard({ job, onDelete, onUpdate }) {
  const statusColor = {
    Pending: 'bg-amber-100 dark:bg-amber-950/40 text-amber-900 dark:text-amber-400 border-amber-200 dark:border-amber-900/30 focus:ring-amber-200/40',
    Applied: 'bg-blue-600 dark:bg-blue-500 text-white border-blue-600 dark:border-blue-500 focus:ring-blue-300/40',
    Interview: 'bg-purple-600 dark:bg-purple-500 text-white border-purple-600 dark:border-purple-500 focus:ring-purple-300/40',
    Selected: 'bg-emerald-600 dark:bg-emerald-500 text-white border-emerald-600 dark:border-emerald-500 focus:ring-emerald-300/40',
    Rejected: 'bg-rose-600 dark:bg-rose-500 text-white border-rose-600 dark:border-rose-500 focus:ring-rose-300/40',
  };

  const getLogo = (company) => {
    const name = company || '?';
    const initial = name.charAt(0).toUpperCase();
    const index = name.length % 5;
    const styles = [
      'bg-blue-50/70 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-100/40 dark:border-blue-900/20',
      'bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-100/40 dark:border-indigo-900/20',
      'bg-purple-50/70 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border-purple-100/40 dark:border-purple-900/20',
      'bg-sky-50/70 dark:bg-sky-955/40 text-sky-655 dark:text-sky-400 border-sky-100/40 dark:border-sky-900/20',
      'bg-cyan-50/70 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 border-cyan-100/40 dark:border-cyan-900/20'
    ];
    return {
      char: initial,
      colorClass: styles[index]
    };
  };

  const logoDetails = getLogo(job.company);

  const formattedDate = () => {
    if (!job.date) return 'No date set';
    try {
      const d = new Date(job.date);
      if (isNaN(d.getTime())) return job.date;
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return job.date;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-md hover:border-slate-350 dark:hover:border-slate-700/80 transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4.5 group text-left shadow-sm">
      <div className="flex items-center gap-4.5 min-w-0">
        {/* Dynamic Logo Circle */}
        <div className={`w-13 h-13 flex items-center justify-center rounded-full border text-base font-black shrink-0 shadow-sm ${logoDetails.colorClass}`}>
          {logoDetails.char}
        </div>
        <div className="min-w-0">
          <h3 className="font-extrabold text-slate-900 dark:text-white text-base truncate">{job.company}</h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm font-bold mt-0.5 truncate">{job.role}</p>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto pt-2.5 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800/85">
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 shrink-0">
          <Calendar className="w-4 h-4" />
          <span className="text-xs font-bold">{formattedDate()}</span>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <select
            value={job.status}
            onChange={(e) => onUpdate(e.target.value)}
            className={`text-xs font-black rounded-full border px-3.5 py-1.5 cursor-pointer outline-none focus:ring-2 transition-all ${
              statusColor[job.status] || 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}
          >
            <option value="Pending" className="text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 font-bold">Pending</option>
            <option value="Applied" className="text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 font-bold">Applied</option>
            <option value="Interview" className="text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 font-bold">Interview</option>
            <option value="Selected" className="text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 font-bold">Selected</option>
            <option value="Rejected" className="text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 font-bold">Rejected</option>
          </select>

          <button
            onClick={onDelete}
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all duration-200 opacity-100 md:opacity-0 md:group-hover:opacity-100 cursor-pointer"
            title="Delete Application"
          >
            <Trash2 className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
}