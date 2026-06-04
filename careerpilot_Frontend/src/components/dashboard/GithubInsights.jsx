export default function GithubInsights({ githubData }) {
  const repos = Number(githubData?.repos) || 0;
  const followers = Number(githubData?.followers) || 0;

  const profileStrength = Math.min(100, repos * 5);

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
      <h2 className="font-semibold mb-4">GitHub Insights</h2>

      {githubData ? (
        <>
          <p>Total Repositories: {repos}</p>
          <p>Followers: {followers}</p>
          <p>Profile Strength: {profileStrength}%</p>
        </>
      ) : (
        <p className="text-slate-500">
          Analyze GitHub to see insights
        </p>
      )}
    </div>
  );
}