import { Award, CheckCircle2, TrendingUp, HelpCircle } from 'lucide-react';

export default function CareerReadiness({ atsScore = 0, githubScore = 0, applications = 0 }) {
  // Calculate readiness score
  const applicationScore = Math.min(100, applications * 10);
  const readinessScore = Math.round(
    atsScore * 0.4 + githubScore * 0.4 + applicationScore * 0.2
  );

  // SVG dimensions for circular progress
  const radius = 50;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (readinessScore / 100) * circumference;

  let feedback = '';
  let color = 'stroke-rose-500';
  let bgColor = 'bg-rose-50 text-rose-800 border-rose-100';
  let badgeText = 'Needs Focus';

  if (readinessScore >= 75) {
    feedback = 'Highly Prepared. Excellent career readiness! Keep tracking applications, preparing for scheduled interviews, and refining your GitHub repos.';
    color = 'stroke-emerald-500';
    bgColor = 'bg-emerald-50 text-emerald-800 border-emerald-100';
    badgeText = 'Highly Competitive';
  } else if (readinessScore >= 40) {
    feedback = 'Ready for Applications. Your profile is getting stronger. Try updating your resume with Node/React keywords and apply to at least 5 jobs.';
    color = 'stroke-blue-500';
    bgColor = 'bg-blue-50 text-blue-800 border-blue-100';
    badgeText = 'Developing Profile';
  } else {
    feedback = 'Early Stage. Focus on building your GitHub profile by committing code and upload a resume to analyze your ATS score.';
    color = 'stroke-rose-500';
    bgColor = 'bg-rose-50 text-rose-800 border-rose-100';
    badgeText = 'Getting Started';
  }

  return (
    <div className="bg-white p-6 rounded-3xl shadow-md border border-slate-100 hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row items-center gap-6">
      
      {/* Circular Progress SVG */}
      <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r={radius}
            className="stroke-slate-100 fill-none"
            strokeWidth={strokeWidth}
          />
          <circle
            cx="64"
            cy="64"
            r={radius}
            className={`fill-none transition-all duration-1000 ease-out ${color}`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-2xl font-extrabold text-slate-800">{readinessScore}%</span>
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Ready</span>
        </div>
      </div>

      {/* Insights / Details */}
      <div className="flex-1 space-y-3">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-lg text-slate-800">Career Readiness Score</h2>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${bgColor}`}>
            {badgeText}
          </span>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          This indicator reflects your placement readiness score, calculated as a weighted average of your Resume ATS rating, GitHub activity score, and volume of job tracker entries.
        </p>

        <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl flex gap-2.5 items-start">
          <TrendingUp className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
              Placement Insight
            </p>
            <p className="text-xs text-slate-650 font-medium leading-normal">
              {feedback}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
