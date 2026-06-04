import { useEffect, useState } from 'react';

export default function ResumeHistory() {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);

  useEffect(() => {
    fetchResumeHistory();
  }, []);

  const fetchResumeHistory = async () => {
    try {
      const storedUser = JSON.parse(
        localStorage.getItem('loggedInUser')
      );

      const response = await fetch(
        `http://localhost:5000/api/resume/${storedUser.id}`
      );

      const data = await response.json();

      setResumes(data);

    } catch (error) {
      console.log(error);
    }
  };

  const deleteResume = async (id) => {
    try {
      await fetch(
        `http://localhost:5000/api/resume/${id}`,
        {
          method: 'DELETE',
        }
      );

      fetchResumeHistory();

    } catch (error) {
      console.log(error);
    }
  };

  const highestScore = Math.max(
    ...resumes.map((r) => r.atsScore),
    0
  );

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 relative">
      <h2 className="font-semibold mb-4 text-xl">
        Uploaded Resumes
      </h2>

      {resumes.length > 0 ? (
        resumes.map((resume, index) => (
          <div
            key={resume._id}
            className="border-b pb-4 mb-4"
          >
            <div className="flex justify-between">
              <p className="font-medium text-sm">
                {resume.fileName}
              </p>

              {index === 0 && (
                <span className="text-xs bg-blue-100 px-2 py-1 rounded-full">
                  Latest
                </span>
              )}
            </div>

            <p className="text-sm mt-1">
              ATS Score: {resume.atsScore}

              {resume.atsScore === highestScore && (
                <span className="ml-2 text-green-600 text-xs">
                  Top Score
                </span>
              )}
            </p>

            <div className="flex justify-between mt-3">
              <p className="text-xs text-slate-400">
                {new Date(
                  resume.createdAt
                ).toLocaleDateString()}
              </p>

              <div className="flex gap-3">

                {/* ✅ PDF Preview */}
                <button
                  onClick={() =>
                    setSelectedResume(resume)
                  }
                  className="text-blue-500 text-xs"
                >
                  Preview
                </button>

                {/* ✅ PDF Download */}
                <a
                  href={`http://localhost:5000/${resume.filePath}`}
                  download
                  className="text-green-600 text-xs"
                >
                  Download
                </a>

                {/* ✅ Delete */}
                <button
                  onClick={() =>
                    deleteResume(resume._id)
                  }
                  className="text-red-500 text-xs"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No resumes uploaded yet</p>
      )}

      {/* ✅ Full PDF Preview Modal */}
      {selectedResume && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-2xl w-[80%] h-[80vh] shadow-xl relative">

            <iframe
              src={`http://localhost:5000/${selectedResume.filePath}`}
              width="100%"
              height="100%"
              className="rounded"
              title="Resume Preview"
            />

            <button
              onClick={() =>
                setSelectedResume(null)
              }
              className="absolute top-3 right-3 bg-black text-white px-3 py-1 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
