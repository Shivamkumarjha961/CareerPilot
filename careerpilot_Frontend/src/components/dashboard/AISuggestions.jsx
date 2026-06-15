import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { Sparkles, Lightbulb, Code, Compass, Briefcase, HelpCircle, Loader2 } from "lucide-react";

export default function AISuggestions({ resumeText, githubData }) {
  const [suggestions, setSuggestions] = useState("");
  const [githubLevel, setGithubLevel] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!resumeText && !githubData) return;

    const fetchAI = async () => {
      setLoading(true);
      try {
        const res = await axios.post(
          `${API_URL}/ai/suggestions`,
          {
            resumeText,
            githubData
          }
        );

        setSuggestions(res.data.suggestions);
        setGithubLevel(res.data.githubLevel);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAI();
  }, [resumeText, githubData]);

  const parseSuggestions = (text) => {
    if (!text) return [];
    return text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 5) // filter short fragments
      .map(line => line.replace(/^[-*\d.\s]+/, '')); // strip bullets/numbers
  };

  const cleanSuggestions = parseSuggestions(suggestions);
  const suggestionIcons = [Lightbulb, Compass, Code, Briefcase, Sparkles];

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md hover:border-slate-200/60 dark:hover:border-slate-700/80 transition-all duration-300 flex flex-col justify-between h-full min-h-[380px]">
      <div>
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-lg text-slate-900 dark:text-white">AI Career Insights</h2>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Automated workspace guide</p>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between bg-slate-50 dark:bg-slate-800/40 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs font-black text-slate-500 dark:text-slate-455 uppercase tracking-wider">GitHub Activity Level</span>
          <span className="text-sm font-black text-blue-700 dark:text-blue-400">{githubLevel || "Awaiting scan..."}</span>
        </div>

        {loading ? (
          <div className="space-y-3 pt-2">
            <div className="bg-slate-50/50 dark:bg-slate-850/20 p-3 rounded-2xl border border-slate-100/60 dark:border-slate-800 flex gap-2.5 items-start animate-pulse">
              <div className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-800 shrink-0" />
              <div className="space-y-2 flex-1 pt-1">
                <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-full" />
                <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-2/3" />
              </div>
            </div>
            <div className="bg-slate-50/50 dark:bg-slate-850/20 p-3 rounded-2xl border border-slate-100/60 dark:border-slate-800 flex gap-2.5 items-start animate-pulse">
              <div className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-800 shrink-0" />
              <div className="space-y-2 flex-1 pt-1">
                <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-full" />
                <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
              </div>
            </div>
            <div className="bg-slate-50/50 dark:bg-slate-850/20 p-3 rounded-2xl border border-slate-100/60 dark:border-slate-800 flex gap-2.5 items-start animate-pulse">
              <div className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-800 shrink-0" />
              <div className="space-y-2 flex-1 pt-1">
                <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />
                <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
              </div>
            </div>
          </div>
        ) : cleanSuggestions.length > 0 ? (
          <div className="space-y-3 pt-1">
            {cleanSuggestions.map((item, index) => {
              const IconComp = suggestionIcons[index % suggestionIcons.length];
              return (
                <div
                  key={index}
                  className="bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700/80 transition-all duration-200 flex gap-3 items-start group"
                >
                  <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 text-slate-600 dark:text-slate-400 shrink-0 mt-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-250">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-bold">
                      {item}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 bg-slate-50 dark:bg-slate-850/15 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl animate-fadeIn">
            <div className="relative w-16 h-16 bg-cyan-50/50 dark:bg-cyan-950/20 border border-cyan-100 dark:border-cyan-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-cyan-650 dark:text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l-7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 2 0l7 4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
            </div>
            <p className="text-xs font-black text-slate-850 dark:text-slate-200">Awaiting Workspace Scans</p>
            <p className="text-[11px] font-bold text-slate-500 dark:text-slate-455 mt-0.5">Upload a resume or analyze GitHub to get insights</p>
          </div>
        )}
      </div>
    </div>
  );
}