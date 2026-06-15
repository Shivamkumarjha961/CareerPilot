import { useEffect, useState } from 'react';
import { API_URL } from '../../config';
import { FileText, Download, Eye, Trash2, Calendar, Award } from 'lucide-react';

export default function ResumeHistory() {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchResumeHistory();
  }, []);

  const fetchResumeHistory = async () => {
    setLoading(true);
    try {
      const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
      if (!storedUser || !storedUser.id) return;

      const response = await fetch(`${API_URL}/resume/${storedUser.id}`);
      const data = await response.json();
      setResumes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteResume = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) return;
    try {
      await fetch(`${API_URL}/resume/${id}`, {
        method: 'DELETE',
      });
      fetchResumeHistory();
    } catch (error) {
      console.log(error);
    }
  };

  const highestScore = Math.max(...resumes.map((r) => r.atsScore || 0), 0);

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-md border border-slate-100/80 dark:border-slate-800 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
          <FileText className="w-5 h-5" />
        </div>
        <div className="text-left">
          <h2 className="font-bold text-base text-slate-800 dark:text-slate-100">Resume History</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500">Previous ATS scans and files</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-6 text-xs text-slate-400 dark:text-slate-500">Loading history...</div>
      ) : resumes.length > 0 ? (
        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
          {resumes.map((resume, index) => (
            <div
              key={resume._id}
              className="bg-slate-50/50 dark:bg-slate-850/20 hover:bg-slate-50 dark:hover:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80 hover:border-slate-200 dark:hover:border-slate-700/80 transition-all duration-200 flex flex-col justify-between gap-3 text-left"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-xs text-slate-800 dark:text-slate-200 truncate max-w-[180px]">
                      {resume.fileName}
                    </p>
                    {index === 0 && (
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30">
                        Latest
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      ATS Match: <span className="font-bold text-slate-800 dark:text-slate-200">{resume.atsScore}%</span>
                    </span>
                    {resume.atsScore === highestScore && highestScore > 0 && (
                      <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-450 flex items-center gap-0.5">
                        <Award className="w-3 h-3" />
                        <span>Best</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-1">
                  {/* Preview */}
                  <button
                    onClick={() => setSelectedResume(resume)}
                    className="p-2 text-slate-450 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/25 rounded-xl transition-all duration-200 cursor-pointer"
                    title="Preview PDF"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {/* Download */}
                  <a
                    href={`${API_URL}/resume/file/${resume._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-450 dark:text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/25 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center"
                    title="Download PDF"
                  >
                    <Download className="w-4 h-4" />
                  </a>

                  {/* Delete */}
                  <button
                    onClick={() => deleteResume(resume._id)}
                    className="p-2 text-slate-450 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/25 rounded-xl transition-all duration-200 cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 mt-0.5">
                <Calendar className="w-3.5 h-3.5" />
                <span className="text-[10px] font-semibold">
                  {new Date(resume.createdAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-50/50 dark:bg-slate-850/15 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
          <p className="text-xs font-semibold text-slate-450 dark:text-slate-500">No resumes uploaded yet</p>
        </div>
      )}

      {/* Full PDF Preview Modal */}
      {selectedResume && (
        <div className="fixed inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-4xl h-[85vh] shadow-2xl relative flex flex-col overflow-hidden animate-slideUp border border-slate-100 dark:border-slate-800">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 truncate max-w-[200px] sm:max-w-[300px]">
                  {selectedResume.fileName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedResume(null)}
                className="bg-slate-950 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer"
              >
                Close Preview
              </button>
            </div>

            <div className="flex-1 bg-slate-100 dark:bg-slate-950">
              <iframe
                src={`${API_URL}/resume/file/${selectedResume._id}`}
                width="100%"
                height="100%"
                className="border-none"
                title="Resume Preview"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
