export default function ATSScore({ atsScore }) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
      <h2 className="font-semibold mb-4">ATS Score</h2>

      <div className="text-4xl font-bold">{atsScore}%</div>

      <p className="text-sm text-slate-500 mt-2">
        Strong frontend profile, backend can improve.
      </p>
    </div>
  );
}