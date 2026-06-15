import { useState } from 'react';
import { API_URL } from '../../config';
import { Github, Loader2, CheckCircle2, AlertCircle, ExternalLink, BookOpen, Users } from 'lucide-react';

export default function GithubAnalyzer({ setGithubScore, setGithubData }) {
  const [github, setGithub] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', text: '' }); // type: 'success' | 'error' | ''

  const handleAnalyze = async () => {
    if (!github.trim()) {
      setStatus({ type: 'error', text: 'Please enter a GitHub username' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', text: '' });
    setData(null);

    try {
      const storedUser = localStorage.getItem('loggedInUser');

      if (!storedUser) {
        setStatus({ type: 'error', text: 'Please login again' });
        setLoading(false);
        return;
      }

      const user = JSON.parse(storedUser);
      const username = github.trim();

      const response = await fetch(
        `${API_URL}/github/${username}?userId=${user.id}`
      );

      const result = await response.json();

      if (!response.ok) {
        setStatus({ type: 'error', text: result.error || 'GitHub fetch failed' });
        setLoading(false);
        return;
      }

      setData(result);
      setGithubData(result);

      const score = Math.min(100, Number(result.repos) * 5);
      setGithubScore(score);

      setStatus({ type: 'success', text: 'GitHub profile analyzed successfully!' });
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', text: 'Server unavailable. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md hover:border-slate-200/60 dark:hover:border-slate-700/80 transition-all duration-300 flex flex-col justify-between h-full min-h-[380px]">
      <div>
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400">
            <Github className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h2 className="font-bold text-base text-slate-800 dark:text-slate-100">GitHub Evaluation</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500">Analyze repo/follower stats</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider mb-2 text-left">
              GitHub Profile Name
            </label>
            <div className="relative">
              <input
                className="w-full border border-slate-200 dark:border-slate-800 focus:border-purple-500 dark:focus:border-purple-550 focus:ring-2 focus:ring-purple-200/50 dark:focus:ring-purple-900/30 p-2.5 pl-9 rounded-xl outline-none text-xs transition-all text-slate-855 dark:text-slate-200 bg-white dark:bg-slate-950 placeholder:text-slate-400 dark:placeholder:text-slate-600"
                placeholder="e.g. torvalds"
                value={github}
                disabled={loading}
                onChange={(e) => setGithub(e.target.value)}
              />
              <Github className="w-4 h-4 text-slate-400 dark:text-slate-505 absolute left-3 top-3.5" />
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full bg-slate-900 dark:bg-slate-100 hover:bg-slate-850 dark:hover:bg-slate-200 text-white dark:text-slate-900 font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm text-xs cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <span>Analyze GitHub</span>
            )}
          </button>
        </div>

        {status.text && (
          <div
            className={`mt-4 p-3.5 rounded-xl text-xs flex items-start gap-2.5 animate-fadeIn ${
              status.type === 'success'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-350 border border-emerald-100/60 dark:border-emerald-900/30'
                : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-350 border border-rose-100/60 dark:border-rose-900/30'
            }`}
          >
            {status.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-450 shrink-0 mt-0.5" />
            )}
            <span className="text-left">{status.text}</span>
          </div>
        )}
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 space-y-4 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-850 shrink-0" />
            <div className="space-y-2.5 flex-1 text-left">
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
              <div className="h-2.5 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-slate-50 dark:bg-slate-850/20 p-2.5 rounded-xl border border-slate-100/50 dark:border-slate-800 h-14 space-y-1.5 flex flex-col justify-center items-center">
              <div className="h-1.5 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
              <div className="h-2.5 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
            </div>
            <div className="bg-slate-50 dark:bg-slate-850/20 p-2.5 rounded-xl border border-slate-100/50 dark:border-slate-800 h-14 space-y-1.5 flex flex-col justify-center items-center">
              <div className="h-1.5 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
              <div className="h-2.5 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
            </div>
            <div className="bg-slate-50/50 dark:bg-slate-850/20 p-2.5 rounded-xl border border-slate-100/50 dark:border-slate-800 h-14 space-y-1.5 flex flex-col justify-center items-center">
              <div className="h-1.5 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
              <div className="h-2.5 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
            </div>
          </div>
        </div>
      )}

      {data && (
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 space-y-4 animate-slideUp">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {data.avatar && (
                <img
                  src={data.avatar}
                  alt={data.username}
                  className="w-10 h-10 rounded-full ring-2 ring-purple-100 dark:ring-purple-950 shrink-0"
                />
              )}
              <div className="min-w-0 text-left">
                <h3 className="font-bold text-slate-800 dark:text-slate-200 text-xs truncate">@{data.username}</h3>
                <a
                  href={data.profile}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] text-purple-650 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center gap-0.5 font-bold mt-0.5 cursor-pointer"
                >
                  <span>View Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-slate-50 dark:bg-slate-850/20 p-2.5 rounded-xl border border-slate-100/50 dark:border-slate-800">
              <BookOpen className="w-4 h-4 text-slate-400 dark:text-slate-500 mx-auto mb-1" />
              <p className="text-slate-400 dark:text-slate-500 text-[9px] uppercase font-bold">Repos</p>
              <p className="font-extrabold text-slate-800 dark:text-slate-100 text-xs mt-0.5">{data.repos}</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-850/20 p-2.5 rounded-xl border border-slate-100/50 dark:border-slate-800">
              <Users className="w-4 h-4 text-slate-400 dark:text-slate-500 mx-auto mb-1" />
              <p className="text-slate-400 dark:text-slate-500 text-[9px] uppercase font-bold">Followers</p>
              <p className="font-extrabold text-slate-800 dark:text-slate-100 text-xs mt-0.5">{data.followers}</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-850/20 p-2.5 rounded-xl border border-slate-100/50 dark:border-slate-800">
              <Users className="w-4 h-4 text-slate-400 dark:text-slate-500 mx-auto mb-1" />
              <p className="text-slate-400 dark:text-slate-500 text-[9px] uppercase font-bold">Following</p>
              <p className="font-extrabold text-slate-800 dark:text-slate-100 text-xs mt-0.5">{data.following}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}