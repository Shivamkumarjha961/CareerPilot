export default function JobCard({ job, onDelete, onUpdate }) {
  const statusColor = {
    Pending: 'bg-yellow-100 text-yellow-700',
    Interview: 'bg-blue-100 text-blue-700',
    Selected: 'bg-green-100 text-green-700',
    Rejected: 'bg-red-100 text-red-700',
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md flex justify-between items-center">
      <div>
        <h3 className="font-semibold text-lg">{job.company}</h3>
        <p className="text-slate-500">{job.role}</p>
      </div>

      <div className="text-right">
        <p className="text-sm">{job.date}</p>

        <select
          value={job.status}
          onChange={(e) => onUpdate(e.target.value)}
          className={`rounded-lg px-3 py-1 mt-2 ${statusColor[job.status]}`}
        >
          <option>Pending</option>
          <option>Interview</option>
          <option>Selected</option>
          <option>Rejected</option>
        </select>

        <button
          onClick={onDelete}
          className="text-red-500 text-sm mt-2 block"
        >
          Delete
        </button>
      </div>
    </div>
  );
}