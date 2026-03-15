import { useEffect, useState } from 'react';

export default function GithubHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    if (user?.id) {
      fetch(`http://localhost:5000/api/github/history/${user.id}`)
        .then((res) => res.json())
        .then((data) => setHistory(data));
    }
  }, []);

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
      <h2 className="font-semibold mb-4">GitHub History</h2>

      {history.length > 0 ? (
        history.map((item, index) => (
          <div key={index} className="mb-3 border-b pb-2">
            <p>{item.username}</p>
            <p className="text-sm text-slate-500">
              Repos: {item.repos}
            </p>
          </div>
        ))
      ) : (
        <p className="text-slate-500">No GitHub history found</p>
      )}
    </div>
  );
}