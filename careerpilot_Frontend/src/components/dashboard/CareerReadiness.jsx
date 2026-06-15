import { Award, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

export default function CareerReadiness({ atsScore = 0, githubScore = 0, applications = 0 }) {
  const applicationScore = Math.min(100, applications * 10);
  const readinessScore = Math.round(
    atsScore * 0.4 + githubScore * 0.4 + applicationScore * 0.2
  );

  const radius = 52;
  const strokeWidth = 7;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (readinessScore / 100) * circumference;

  let feedback = '';
  let badgeStyle = '';
  let ringColor = 'stroke-rose-500';
  let badgeText = '';
  let recommendations = [];

  if (readinessScore >= 75) {
    feedback = 'Your profile is highly competitive and ready for top-tier hiring pipelines!';
    ringColor = 'stroke-emerald-500';
    badgeStyle = 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-350 border-emerald-100 dark:border-emerald-900/30';
    badgeText = 'Highly Competitive';
    recommendations = [
      { text: 'Refine cover letters for specialized roles', completed: true },
      { text: 'Schedule mockup interviews for upcoming dates', completed: false },
      { text: 'Keep adding new applications to stay active', completed: true }
    ];
  } else if (readinessScore >= 40) {
    feedback = 'Your profile is developing nicely. Focus on final optimizations to boost compatibility.';
    ringColor = 'stroke-blue-500';
    badgeStyle = 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border-blue-100 dark:border-blue-900/30';
    badgeText = 'Developing Profile';
    recommendations = [
      { text: 'Include more target keywords (Node, React) in your resume', completed: false },
      { text: 'Apply to at least 5 job tracking positions', completed: applications >= 5 },
      { text: 'Refine repository summaries on your GitHub profile', completed: true }
    ];
  } else {
    feedback = 'Profile is in the early staging phase. Complete core checklists to unlock placements.';
    ringColor = 'stroke-rose-500';
    badgeStyle = 'bg-rose-50 dark:bg-rose-950/50 text-rose-800 dark:text-rose-450 border-rose-100 dark:border-rose-900/30';
    badgeText = 'Getting Started';
    recommendations = [
      { text: 'Scan your first resume to establish an ATS baseline', completed: atsScore > 0 },
      { text: 'Input a valid GitHub profile for source repository checks', completed: githubScore > 0 },
      { text: 'Add your first job tracking listing to the queue', completed: applications > 0 }
    ];
  }

  return (
    <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md hover:border-slate-200/60 dark:hover:border-slate-700/80 transition-all duration-300">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Left Circular Ring Panel */}
        <div className="md:col-span-4 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800 pb-6 md:pb-0 md:pr-8">
          <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r={radius}
                className="stroke-slate-50 dark:stroke-slate-800 fill-none"
                strokeWidth={strokeWidth}
              />
              <circle
                cx="72"
                cy="72"
                r={radius}
                className={`fill-none transition-all duration-1000 ease-out ${ringColor}`}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">{readinessScore}%</span>
              <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-0.5">Overall Index</span>
            </div>
          </div>
          
          <div className="mt-4">
            <span className={`inline-block text-[10px] font-bold px-3 py-1 rounded-full border ${badgeStyle}`}>
              {badgeText}
            </span>
          </div>
        </div>

        {/* Right Insights and Action Recommendations Panel */}
        <div className="md:col-span-8 space-y-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-550 dark:text-indigo-400" />
              <h2 className="font-bold text-base text-slate-800 dark:text-slate-150">Career Readiness Centerpiece</h2>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-450 font-medium leading-relaxed">
              This score aggregates metrics from your resume parsing profile, code repo evaluations, and overall job tracking application pipeline.
            </p>
          </div>

          <div className="p-4 bg-slate-50/50 dark:bg-slate-850/40 border border-slate-100 dark:border-slate-800 rounded-2xl flex gap-3 items-start">
            <TrendingUp className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Placement Insight</p>
              <p className="text-xs text-slate-655 dark:text-slate-300 font-semibold leading-normal mt-0.5">{feedback}</p>
            </div>
          </div>

          <div className="space-y-2.5">
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Recommended Milestones</p>
            <div className="space-y-2">
              {recommendations.map((rec, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="shrink-0 mt-0.5">
                    {rec.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-50/30 dark:fill-emerald-950/20" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-slate-200 dark:border-slate-700" />
                    )}
                  </div>
                  <span className={`text-xs font-medium ${rec.completed ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-slate-650 dark:text-slate-300'}`}>
                    {rec.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
