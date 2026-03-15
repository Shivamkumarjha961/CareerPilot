import { useState } from 'react';

export default function GithubAnalyzer({ setGithubScore, setGithubData }) {
  const [github, setGithub] = useState('');
  const [data, setData] = useState(null);
  const [message, setMessage] = useState('');

  const handleAnalyze = async () => {
    try {
      const storedUser = localStorage.getItem('loggedInUser');

      if (!storedUser) {
        setMessage('Please login again');
        return;
      }

      const user = JSON.parse(storedUser);

      const username = github.trim();

      const response = await fetch(
        `http://localhost:5000/api/github/${username}?userId=${user.id}`
      );

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.error);
        return;
      }

      setData(result);
      setGithubData(result);

      const score = Math.min(100, Number(result.repos) * 5);

      setGithubScore(score);

      setMessage('GitHub analyzed successfully');

    } catch (error) {
      console.error(error);
      setMessage('GitHub fetch failed');
    }
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
      <h2 className="font-semibold mb-4">GitHub Profile</h2>

      <input
        className="w-full border p-2 rounded-lg"
        placeholder="Enter GitHub username"
        value={github}
        onChange={(e) => setGithub(e.target.value)}
      />

      <button
        onClick={handleAnalyze}
        className="mt-4 w-full bg-black text-white py-2 rounded-lg"
      >
        Analyze GitHub
      </button>

      {message && <p className="mt-3 text-sm text-green-600">{message}</p>}

      {data && (
        <div className="mt-4 text-sm space-y-2">
          <p>Repos: {data.repos}</p>
          <p>Followers: {data.followers}</p>
          <p>Following: {data.following}</p>

          <a href={data.profile} target="_blank" rel="noreferrer">
            Profile Link
          </a>
        </div>
      )}
    </div>
  );
}