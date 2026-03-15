import { useState } from 'react';

export default function ResumeUpload({
  setAtsScore,
  setResumeText,
}) {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState('');

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please upload a resume');
      return;
    }

    try {
      const storedUser = localStorage.getItem('loggedInUser');

      if (!storedUser) {
        setMessage('User not found. Please login again.');
        return;
      }

      const user = JSON.parse(storedUser);

      const formData = new FormData();
      formData.append('resume', file);
      formData.append('userId', user.id);

      const response = await fetch(
        'http://localhost:5000/api/resume',
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setResult(data);

        setAtsScore(data.atsScore);

        if (setResumeText) {
          setResumeText(data.extractedText);
        }

        setMessage('Resume uploaded successfully');

      } else {
        setMessage(data.error || 'Resume upload failed');
      }

    } catch (error) {
      console.error(error);
      setMessage('Resume upload failed');
    }
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
      <h2 className="font-semibold mb-4">
        Resume ATS Checker
      </h2>

      <label className="block w-full border p-3 rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 text-center">
        {file ? file.name : 'Choose Resume File'}

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
          className="hidden"
        />
      </label>

      <button
        onClick={handleUpload}
        className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-slate-800 transition"
      >
        Upload Resume
      </button>

      {message && (
        <p className="mt-3 text-sm text-green-600">
          {message}
        </p>
      )}

      {result && (
        <div className="mt-4 text-sm space-y-2">
          <p>ATS Score: {result.atsScore}</p>

          <p className="line-clamp-3">
            {result.extractedText}
          </p>
        </div>
      )}
    </div>
  );
}