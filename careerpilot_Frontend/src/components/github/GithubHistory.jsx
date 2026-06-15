import { useEffect, useState } from 'react';
import { API_URL } from '../../config';
import { Github, BookOpen, Users, Calendar } from 'lucide-react';

export default function GithubHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    if (user?.id) {
      setLoading(true);
      fetch(`${API_URL}/github/history/${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setHistory(Array.isArray(data) ? data : []);
        })
        .catch(err => console.log(err))
        .finally(() => setLoading(false));
    }
  }, []);

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-md border border-slate-100/80 dark:border-slate-800 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400">
          <Github className="w-5 h-5" />
        </div>
        <div className="text-left">
          <h2 className="font-bold text-base text-slate-800 dark:text-slate-100">GitHub History</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500">Previous profile evaluation records</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-6 text-xs text-slate-400 dark:text-slate-500">Loading history...</div>
      ) : history.length > 0 ? (
        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
          {history.map((item, index) => (
            <div
              key={index}
              className="bg-slate-50/50 dark:bg-slate-850/20 hover:bg-slate-50 dark:hover:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80 hover:border-slate-200 dark:hover:border-slate-700/80 transition-all duration-200 text-left"
            >
              <div className="flex justify-between items-start">
                <div className="min-w-0">
                  <p className="font-bold text-xs text-slate-800 dark:text-slate-200 truncate">@{item.username}</p>
                  <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                    <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                      <span>{item.repos} Repos</span>
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                      <span>{item.followers} Followers</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-550 shrink-0">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-semibold">
                    {new Date(item.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-50/50 dark:bg-slate-850/15 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
          <p className="text-xs font-semibold text-slate-450 dark:text-slate-550">No GitHub history found</p>
        </div>
      )}
    </div>
  );
}