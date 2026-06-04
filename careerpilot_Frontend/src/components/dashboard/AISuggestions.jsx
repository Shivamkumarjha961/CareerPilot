import { useEffect, useState } from "react";
import axios from "axios";

export default function AISuggestions({ resumeText, githubData }) {
  const [suggestions, setSuggestions] = useState("");
  const [githubLevel, setGithubLevel] = useState("");

  useEffect(() => {

    if (!resumeText && !githubData) return;

    const fetchAI = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/ai/suggestions",
          {
            resumeText,
            githubData
          }
        );

        setSuggestions(res.data.suggestions);
        setGithubLevel(res.data.githubLevel);

      } catch (error) {
        console.log(error);
      }
    };

    fetchAI();

  }, [resumeText, githubData]);

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
      <h2 className="font-semibold mb-4 text-xl">
        AI Career Suggestions
      </h2>

      <p className="mb-3 text-sm text-blue-600 font-medium">
        GitHub Level: {githubLevel || "Not analyzed"}
      </p>

      {suggestions ? (
        suggestions.split("\n").map((item, index) => (
          <p key={index} className="text-sm mb-2">
            {item}
          </p>
        ))
      ) : (
        <p>Waiting for analysis...</p>
      )}
    </div>
  );
}