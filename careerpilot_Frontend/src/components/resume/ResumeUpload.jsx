import { useState } from 'react';
import { API_URL } from '../../config';
import { UploadCloud, FileText, Loader2, CheckCircle2, AlertCircle, Trash2 } from 'lucide-react';

export default function ResumeUpload({ setAtsScore, setResumeText }) {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progressStep, setProgressStep] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);
  const [status, setStatus] = useState({ type: '', text: '' }); // type: 'success' | 'error' | ''

  const handleUpload = async () => {
    if (!file) {
      setStatus({ type: 'error', text: 'Please select a resume file first' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', text: '' });
    setResult(null);
    setProgressPercent(5);

    // Dynamic progress simulation
    const steps = [
      { text: 'Uploading Resume...', percent: 15, delay: 0 },
      { text: 'Extracting Content...', percent: 45, delay: 800 },
      { text: 'Running ATS Analysis...', percent: 75, delay: 1800 },
      { text: 'Generating Score...', percent: 95, delay: 2800 }
    ];

    const timers = [];
    steps.forEach(step => {
      const timer = setTimeout(() => {
        setProgressStep(step.text);
        setProgressPercent(step.percent);
      }, step.delay);
      timers.push(timer);
    });

    try {
      const storedUser = localStorage.getItem('loggedInUser');

      if (!storedUser) {
        setStatus({ type: 'error', text: 'User not found. Please login again.' });
        timers.forEach(clearTimeout);
        setLoading(false);
        return;
      }

      const user = JSON.parse(storedUser);
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('userId', user.id);

      const response = await fetch(`${API_URL}/resume`, {
        method: 'POST',
        body: formData,
      });

      // Wait a brief moment to ensure the user sees the stages if server is super fast
      await new Promise(resolve => setTimeout(resolve, 3200));
      timers.forEach(clearTimeout);

      const data = await response.json();

      if (response.ok) {
        setProgressPercent(100);
        setProgressStep('Analysis Complete');
        setResult(data);
        setAtsScore(data.atsScore);

        if (setResumeText) {
          setResumeText(data.extractedText);
        }

        setStatus({ type: 'success', text: 'Resume uploaded and analyzed successfully!' });
      } else {
        setStatus({ type: 'error', text: data.error || 'Resume parsing failed' });
      }
    } catch (error) {
      console.error(error);
      timers.forEach(clearTimeout);
      setStatus({ type: 'error', text: 'Failed to connect to the server' });
    } finally {
      setLoading(false);
      setProgressStep('');
      setProgressPercent(0);
    }
  };

  const removeFile = () => {
    if (loading) return;
    setFile(null);
    setResult(null);
    setStatus({ type: '', text: '' });
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md hover:border-slate-200/60 dark:hover:border-slate-700/80 transition-all duration-300 flex flex-col justify-between h-full min-h-[380px]">
      <div>
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-500 dark:text-blue-400">
            <FileText className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h2 className="font-bold text-base text-slate-800 dark:text-slate-100">Resume ATS Checker</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500">Evaluate resume compatibility</p>
          </div>
        </div>

        {/* Upload Dropzone */}
        {!file ? (
          <label className="group flex flex-col items-center justify-center border border-dashed border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 rounded-2xl p-7 cursor-pointer bg-slate-50/50 dark:bg-slate-850/25 hover:bg-blue-50/5 transition-all duration-200">
            <UploadCloud className="w-7 h-7 text-slate-400 group-hover:text-blue-500 transition-colors duration-200 mb-2" />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Choose Resume file</span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">PDF, DOC, DOCX up to 10MB</span>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
            />
          </label>
        ) : (
          <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-850/50 border border-slate-100 dark:border-slate-800 rounded-2xl animate-fadeIn">
            <div className="flex items-center gap-2.5 min-w-0">
              <FileText className="w-4 h-4 text-blue-500 shrink-0" />
              <div className="min-w-0 text-left">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{file.name}</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <button
              onClick={removeFile}
              disabled={loading}
              className="p-1.5 rounded-lg text-slate-400 dark:text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Submit / Progress button */}
        {file && (
          <div className="mt-4 space-y-3">
            <button
              onClick={handleUpload}
              disabled={loading}
              className="w-full bg-slate-900 dark:bg-slate-100 hover:bg-slate-850 dark:hover:bg-slate-200 text-white dark:text-slate-900 font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm text-xs cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{progressStep}</span>
                </>
              ) : (
                <span>Upload & Analyze</span>
              )}
            </button>

            {loading && (
              <div className="space-y-1.5 animate-fadeIn">
                <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 font-bold">
                  <span>Progress</span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-blue-500 h-1.5 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Notification Banner */}
        {status.text && (
          <div
            className={`mt-4 p-3.5 rounded-xl text-xs flex items-start gap-2.5 animate-fadeIn ${
              status.type === 'success'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-350 border border-emerald-100/60 dark:border-emerald-900/30'
                : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-350 border border-rose-100/60 dark:border-rose-900/30'
            }`}
          >
            {status.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-450 shrink-0 mt-0.5" />
            )}
            <span className="text-left">{status.text}</span>
          </div>
        )}
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 space-y-4 animate-pulse">
          <div className="flex justify-between items-center bg-slate-50/80 dark:bg-slate-850/20 p-3.5 rounded-xl border border-slate-100/60 dark:border-slate-800 h-10">
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-10" />
          </div>
          <div className="bg-slate-50/80 dark:bg-slate-850/20 p-3.5 rounded-xl border border-slate-100/60 dark:border-slate-800 space-y-2.5">
            <div className="h-2.5 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
            <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-full" />
            <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />
          </div>
        </div>
      )}

      {result && (
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 space-y-4 animate-slideUp">
          <div className="flex justify-between items-center bg-slate-50/80 dark:bg-slate-850/20 p-3 rounded-xl border border-slate-100/60 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">ATS Score</span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100">{result.atsScore}%</span>
          </div>

          <div className="bg-slate-50/80 dark:bg-slate-850/20 p-3.5 rounded-xl border border-slate-100/60 dark:border-slate-800 text-left">
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-1">
              Extracted Keywords
            </p>
            <p className="text-xs text-slate-550 dark:text-slate-300 leading-relaxed line-clamp-2">
              {result.extractedText}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}