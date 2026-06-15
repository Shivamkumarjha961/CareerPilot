import { FileText, Briefcase, Github, Target } from 'lucide-react';

export default function StatsCards({ atsScore, githubScore, applications }) {
  const jobMatch = Math.round((atsScore + githubScore) / 2);

  const stats = [
    {
      title: 'ATS Score',
      value: `${atsScore}%`,
      icon: FileText,
      colorClass: 'text-blue-500 bg-blue-50/50 dark:bg-blue-950/20 border-blue-100/50 dark:border-blue-900/30',
      description: 'Resume keyword match rate'
    },
    {
      title: 'Applications',
      value: applications,
      icon: Briefcase,
      colorClass: 'text-sky-500 bg-sky-50/50 dark:bg-sky-950/20 border-sky-100/50 dark:border-sky-900/30',
      description: 'Active pipeline listings'
    },
    {
      title: 'GitHub Score',
      value: `${githubScore}%`,
      icon: Github,
      colorClass: 'text-purple-500 bg-purple-50/50 dark:bg-purple-950/20 border-purple-100/50 dark:border-purple-900/30',
      description: 'Repository strength evaluation'
    },
    {
      title: 'Job Match',
      value: `${jobMatch}%`,
      icon: Target,
      colorClass: 'text-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-100/50 dark:border-indigo-900/30',
      description: 'Profile compatibility index'
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
      {stats.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <div
            key={index}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 md:p-6 hover:shadow-md hover:border-slate-200/60 dark:hover:border-slate-700/80 transition-all duration-300 group flex flex-col justify-between"
          >
            <div className="flex justify-between items-start gap-4">
              <div>
                <span className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-wider block">
                  {item.title}
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-slate-100 mt-2 tracking-tight">
                  {item.value}
                </h2>
              </div>
              <div className={`p-2.5 rounded-xl border transition-colors duration-200 shrink-0 ${item.colorClass}`}>
                <IconComponent className="w-4 h-4" />
              </div>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-3 pt-3 border-t border-slate-50 dark:border-slate-800/60 group-hover:text-slate-550 dark:group-hover:text-slate-400 transition-colors">
              {item.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}