export default function ReminderCard() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
      <h2 className="font-semibold mb-4">Upcoming Reminder</h2>
      <p className="text-sm text-slate-500">
        Google interview tomorrow at 11:00 AM
      </p>

      <span className="inline-block mt-4 px-3 py-1 bg-yellow-200 rounded-lg text-sm">
        Pending
      </span>
    </div>
  );
}