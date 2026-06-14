import { useState } from 'react';
import { API_URL } from '../../config';
import { UploadCloud, FileText, Loader2, CheckCircle2, AlertCircle, Trash2 } from 'lucide-react';

export default function ResumeUpload({ setAtsScore, setResumeText }) {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progressStep, setProgressStep] = useState('');
  const [status, setStatus] = useState({ type: '', text: '' }); // type: 'success' | 'error' | ''

  const handleUpload = async () => {
    if (!file) {
      setStatus({ type: 'error', text: 'Please select a resume file first' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', text: '' });
    setResult(null);

    // Dynamic progress simulation
    const steps = [
      { text: 'Uploading Resume...', delay: 0 },
      { text: 'Extracting Content...', delay: 800 },
      { text: 'Running ATS Analysis...', delay: 1800 },
      { text: 'Generating Score...', delay: 2800 }
    ];

    const timers = [];
    steps.forEach(step => {
      const timer = setTimeout(() => {
        setProgressStep(step.text);
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
    }
  };

  const removeFile = () => {
    if (loading) return;
    setFile(null);
    setResult(null);
    setStatus({ type: '', text: '' });
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-md border border-slate-100 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-semibold text-lg text-slate-800">Resume ATS Checker</h2>
            <p className="text-xs text-slate-400">Evaluate your resume for keyword matches</p>
          </div>
        </div>

        {/* Upload Dropzone */}
        {!file ? (
          <label className="group flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-2xl p-6 cursor-pointer bg-slate-50/50 hover:bg-blue-50/10 transition-all duration-200">
            <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-blue-500 transition-colors duration-200 mb-2" />
            <span className="text-sm font-medium text-slate-700">Choose Resume file</span>
            <span className="text-xs text-slate-400 mt-1">PDF, DOC, DOCX up to 10MB</span>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
            />
          </label>
        ) : (
          <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-150 rounded-2xl animate-fadeIn">
            <div className="flex items-center gap-2.5 min-w-0">
              <FileText className="w-5 h-5 text-blue-500 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-800 truncate">{file.name}</p>
                <p className="text-[10px] text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <button
              onClick={removeFile}
              disabled={loading}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Submit button */}
        {file && (
          <button
            onClick={handleUpload}
            disabled={loading}
            className="mt-4 w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm text-sm"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{progressStep || 'Analyzing Resume...'}</span>
              </>
            ) : (
              <span>Upload & Analyze</span>
            )}
          </button>
        )}

        {/* Notification Banner */}
        {status.text && (
          <div
            className={`mt-4 p-3.5 rounded-xl text-xs flex items-start gap-2.5 animate-fadeIn ${
              status.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-100'
                : 'bg-rose-50 text-rose-800 border border-rose-100'
            }`}
          >
            {status.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            )}
            <span>{status.text}</span>
          </div>
        )}
      </div>

      {result && (
        <div className="mt-6 pt-5 border-t border-slate-100 space-y-3 animate-slideUp">
          <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100/50">
            <span className="text-xs font-medium text-slate-500">ATS Match Score</span>
            <span className="text-sm font-bold text-slate-800">{result.atsScore}%</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100/50">
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-1">
              Extracted Keywords
            </p>
            <p className="text-xs text-slate-650 leading-relaxed line-clamp-3">
              {result.extractedText}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}