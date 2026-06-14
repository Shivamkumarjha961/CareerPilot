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
    <div className="bg-white p-6 rounded-3xl shadow-md border border-slate-100 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
            <Github className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-semibold text-lg text-slate-800">GitHub Evaluation</h2>
            <p className="text-xs text-slate-400">Analyze repository and follower statistics</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              GitHub Profile Name
            </label>
            <div className="relative">
              <input
                className="w-full border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200/50 p-3 pl-10 rounded-xl outline-none text-sm transition-all text-slate-800 placeholder:text-slate-400"
                placeholder="e.g. torvalds"
                value={github}
                disabled={loading}
                onChange={(e) => setGithub(e.target.value)}
              />
              <Github className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm text-sm"
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
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-100'
                : 'bg-rose-50 text-rose-800 border border-rose-100'
            }`}
          >
            {status.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            )}
            <span>{status.text}</span>
          </div>
        )}
      </div>

      {data && (
        <div className="mt-6 pt-5 border-t border-slate-100 space-y-4 animate-slideUp">
          <div className="flex items-center gap-3">
            {data.avatar && (
              <img
                src={data.avatar}
                alt={data.username}
                className="w-10 h-10 rounded-full ring-2 ring-purple-100 shrink-0"
              />
            )}
            <div className="min-w-0">
              <h3 className="font-semibold text-slate-800 text-sm truncate">@{data.username}</h3>
              <a
                href={data.profile}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-purple-600 hover:text-purple-700 flex items-center gap-0.5 font-medium"
              >
                <span>View Profile</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100/50">
              <BookOpen className="w-4 h-4 text-slate-400 mx-auto mb-1" />
              <p className="text-slate-400 text-[10px] uppercase font-semibold">Repos</p>
              <p className="font-bold text-slate-800 text-sm mt-0.5">{data.repos}</p>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100/50">
              <Users className="w-4 h-4 text-slate-400 mx-auto mb-1" />
              <p className="text-slate-400 text-[10px] uppercase font-semibold">Followers</p>
              <p className="font-bold text-slate-800 text-sm mt-0.5">{data.followers}</p>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100/50">
              <Users className="w-4 h-4 text-slate-400 mx-auto mb-1" />
              <p className="text-slate-400 text-[10px] uppercase font-semibold">Following</p>
              <p className="font-bold text-slate-800 text-sm mt-0.5">{data.following}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}