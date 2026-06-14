import { Building2, Calendar, Trash2 } from 'lucide-react';

export default function JobCard({ job, onDelete, onUpdate }) {
  const statusColor = {
    Pending: 'bg-amber-50 text-amber-700 border-amber-100 focus:ring-amber-200/50',
    Applied: 'bg-blue-50 text-blue-700 border-blue-100 focus:ring-blue-200/50',
    Interview: 'bg-purple-50 text-purple-700 border-purple-100 focus:ring-purple-200/50',
    Selected: 'bg-emerald-50 text-emerald-700 border-emerald-100 focus:ring-emerald-200/50',
    Rejected: 'bg-rose-50 text-rose-700 border-rose-100 focus:ring-rose-200/50',
  };

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
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200/80 transition-all duration-300 flex justify-between items-center group">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-slate-50 border border-slate-100 text-slate-500 rounded-xl group-hover:bg-slate-100 transition-colors duration-200">
          <Building2 className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-slate-800 text-base">{job.company}</h3>
          <p className="text-slate-500 text-sm font-medium mt-0.5">{job.role}</p>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="hidden sm:flex items-center gap-1.5 text-slate-400">
          <Calendar className="w-4 h-4" />
          <span className="text-xs font-semibold">{formattedDate()}</span>
        </div>

        <div className="flex flex-col items-end gap-1.5">
          <select
            value={job.status}
            onChange={(e) => onUpdate(e.target.value)}
            className={`text-xs font-bold rounded-full border px-3 py-1 cursor-pointer outline-none focus:ring-2 transition-all ${
              statusColor[job.status] || 'bg-slate-50 text-slate-700 border-slate-200'
            }`}
          >
            <option value="Pending">Pending</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>

          <button
            onClick={onDelete}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all duration-200 opacity-0 group-hover:opacity-100"
            title="Delete Application"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}