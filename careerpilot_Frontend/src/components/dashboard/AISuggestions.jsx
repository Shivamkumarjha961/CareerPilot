import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { Sparkles, Lightbulb, Code, Compass, Briefcase, ChevronRight, HelpCircle } from "lucide-react";

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
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full min-h-[380px]">
      <div>
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-xl bg-cyan-50 text-cyan-600">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-base text-slate-800">AI Career Insights</h2>
            <p className="text-xs text-slate-400">Automated workspace guide</p>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between bg-slate-50/80 px-3.5 py-2 rounded-xl border border-slate-100/60">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">GitHub Activity Level</span>
          <span className="text-xs font-bold text-blue-600">{githubLevel || "Awaiting scan..."}</span>
        </div>

        {loading ? (
          <div className="space-y-3 pt-2">
            <div className="h-10 bg-slate-50 border border-slate-100 rounded-xl animate-pulse" />
            <div className="h-10 bg-slate-50 border border-slate-100 rounded-xl animate-pulse" />
            <div className="h-10 bg-slate-50 border border-slate-100 rounded-xl animate-pulse" />
          </div>
        ) : cleanSuggestions.length > 0 ? (
          <div className="space-y-3 pt-1 max-h-[200px] overflow-y-auto pr-1">
            {cleanSuggestions.map((item, index) => {
              const IconComp = suggestionIcons[index % suggestionIcons.length];
              return (
                <div
                  key={index}
                  className="bg-slate-50/50 hover:bg-slate-50 p-3 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all duration-200 flex gap-2.5 items-start group"
                >
                  <div className="p-1.5 rounded-lg bg-white border border-slate-100 text-slate-550 shrink-0 mt-0.5 group-hover:text-blue-600 transition-colors duration-250">
                    <IconComp className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-650 leading-relaxed font-medium">
                      {item}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-10 bg-slate-50/50 border border-dashed border-slate-200 rounded-2xl">
            <HelpCircle className="w-6 h-6 text-slate-350 mx-auto mb-2" />
            <p className="text-xs font-semibold text-slate-450">Awaiting evaluations to generate tips</p>
          </div>
        )}
      </div>
    </div>
  );
}