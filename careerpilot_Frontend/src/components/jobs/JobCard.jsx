import { Calendar, Trash2 } from 'lucide-react';

export default function JobCard({ job, onDelete, onUpdate }) {
  const statusColor = {
    Pending: 'bg-amber-100 text-amber-900 border-amber-200 focus:ring-amber-200/40',
    Applied: 'bg-blue-600 text-white border-blue-600 focus:ring-blue-300/40',
    Interview: 'bg-purple-600 text-white border-purple-600 focus:ring-purple-300/40',
    Selected: 'bg-emerald-600 text-white border-emerald-600 focus:ring-emerald-300/40',
    Rejected: 'bg-rose-600 text-white border-rose-600 focus:ring-rose-300/40',
  };

  const getLogo = (company) => {
    const name = company || '?';
    const initial = name.charAt(0).toUpperCase();
    const index = name.length % 5;
    const styles = [
      'bg-blue-50/70 text-blue-600 border-blue-100/40',
      'bg-indigo-50/70 text-indigo-600 border-indigo-100/40',
      'bg-purple-50/70 text-purple-600 border-purple-100/40',
      'bg-sky-50/70 text-sky-655 border-sky-100/40',
      'bg-cyan-50/70 text-cyan-600 border-cyan-100/40'
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
    <div className="bg-white p-5 rounded-2xl border border-slate-100/80 hover:shadow-md hover:border-slate-200/60 transition-all duration-300 flex justify-between items-center group">
      <div className="flex items-center gap-4.5">
        {/* Dynamic Logo Circle */}
        <div className={`w-12 h-12 flex items-center justify-center rounded-full border text-sm font-black shrink-0 shadow-sm ${logoDetails.colorClass}`}>
          {logoDetails.char}
        </div>
        <div>
          <h3 className="font-bold text-slate-800 text-sm">{job.company}</h3>
          <p className="text-slate-400 text-xs font-semibold mt-0.5">{job.role}</p>
        </div>
      </div>

      <div className="flex items-center gap-4.5">
        <div className="hidden sm:flex items-center gap-1.5 text-slate-400">
          <Calendar className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold">{formattedDate()}</span>
        </div>

        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
          <select
            value={job.status}
            onChange={(e) => onUpdate(e.target.value)}
            className={`text-[10px] font-extrabold rounded-full border px-3 py-1 cursor-pointer outline-none focus:ring-2 transition-all ${
              statusColor[job.status] || 'bg-slate-50 text-slate-700 border-slate-200'
            }`}
          >
            <option value="Pending" className="text-slate-800 bg-white font-medium">Pending</option>
            <option value="Applied" className="text-slate-800 bg-white font-medium">Applied</option>
            <option value="Interview" className="text-slate-800 bg-white font-medium">Interview</option>
            <option value="Selected" className="text-slate-800 bg-white font-medium">Selected</option>
            <option value="Rejected" className="text-slate-800 bg-white font-medium">Rejected</option>
          </select>

          <button
            onClick={onDelete}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50/50 transition-all duration-200 opacity-0 group-hover:opacity-100"
            title="Delete Application"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}