import { FileText, Briefcase, Github, Target } from 'lucide-react';

export default function StatsCards({ atsScore, githubScore, applications }) {
  const jobMatch = Math.round((atsScore + githubScore) / 2);

  const stats = [
    {
      title: 'ATS Score',
      value: `${atsScore}%`,
      icon: FileText,
      colorClass: 'text-blue-600 bg-blue-50 border-blue-100',
      hoverGlow: 'hover:shadow-blue-100/50 hover:border-blue-200'
    },
    {
      title: 'Applications',
      value: applications,
      icon: Briefcase,
      colorClass: 'text-cyan-600 bg-cyan-50 border-cyan-100',
      hoverGlow: 'hover:shadow-cyan-100/50 hover:border-cyan-200'
    },
    {
      title: 'GitHub Score',
      value: `${githubScore}%`,
      icon: Github,
      colorClass: 'text-purple-600 bg-purple-50 border-purple-100',
      hoverGlow: 'hover:shadow-purple-100/50 hover:border-purple-200'
    },
    {
      title: 'Job Match',
      value: `${jobMatch}%`,
      icon: Target,
      colorClass: 'text-indigo-600 bg-indigo-50 border-indigo-100',
      hoverGlow: 'hover:shadow-indigo-100/50 hover:border-indigo-200'
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <div
            key={index}
            className={`bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ${item.hoverGlow}`}
          >
            <div className="flex justify-between items-start">
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                {item.title}
              </span>
              <div className={`p-2 rounded-xl border ${item.colorClass}`}>
                <IconComponent className="w-4 h-4" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mt-3 tracking-tight">
              {item.value}
            </h2>
          </div>
        );
      })}
    </div>
  );
}