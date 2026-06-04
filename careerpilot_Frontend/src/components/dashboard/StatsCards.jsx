export default function StatsCards({ atsScore, githubScore, applications }) {
  const jobMatch = Math.round((atsScore + githubScore) / 2);

  const stats = [
    { title: 'ATS Score', value: `${atsScore}%` },
    { title: 'Applications', value: applications },
    { title: 'GitHub Score', value: `${githubScore}%` },
    { title: 'Job Match', value: `${jobMatch}%` },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6 mb-8">
      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-3xl shadow-lg p-6 border border-slate-100"
        >
          <p className="text-slate-500 text-sm">{item.title}</p>
          <h2 className="text-4xl font-bold mt-2">{item.value}</h2>
        </div>
      ))}
    </div>
  );
}



// export default function StatsCards({ atsScore, githubScore, applications }) {
//   const stats = [
//     { title: 'ATS Score', value: `${atsScore}%` },
//     { title: 'Applications', value: applications },
//     { title: 'GitHub Score', value: `${githubScore}%` },
//   ];

//   return (
//     <div className="grid md:grid-cols-3 gap-6 mb-8">
//       {stats.map((item, index) => (
//         <div
//           key={index}
//           className="bg-white rounded-3xl shadow-lg p-6 border border-slate-100"
//         >
//           <p className="text-slate-500 text-sm">{item.title}</p>
//           <h2 className="text-4xl font-bold mt-2">{item.value}</h2>
//         </div>
//       ))}
//     </div>
//   );
// }