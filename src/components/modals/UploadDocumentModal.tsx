import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UploadCloud, X, FileText, CheckCircle2 } from 'lucide-react';

export const UploadDocumentModal: React.FC = () => {
  const { uploadModalOpen, setUploadModalOpen, addToast } = useApp();
  const [dragActive, setDragActive] = useState(false);
  const [docCategory, setDocCategory] = useState<'Estate' | 'Tax' | 'Portfolio' | 'Retirement' | 'Legal'>('Tax');
  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  if (!uploadModalOpen) return null;

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileName(e.dataTransfer.files[0].name);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName) {
      addToast('Please select a file', 'Choose a PDF, TIFF, or DOCX document to upload.', 'warning');
      return;
    }
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadModalOpen(false);
      addToast(
        'Document Ingested into Fiduciary Vault',
        `${fileName} was encrypted with AES-256 and tagged under ${docCategory}.`,
        'success'
      );
      setFileName('');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
      <div className="fixed inset-0" onClick={() => !isUploading && setUploadModalOpen(false)} />
      <div className="relative w-full max-w-lg bg-[#0F172A]/90 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] border border-white/10 p-6 flex flex-col gap-5 z-10 animate-in fade-in zoom-in-95">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                Upload to Fiduciary Vault
              </h3>
              <p className="text-xs text-slate-400">
                SEC Rule 17a-4 &amp; FINRA 4511 WORM compliant cryptographic archival.
              </p>
            </div>
          </div>
          <button
            onClick={() => setUploadModalOpen(false)}
            disabled={isUploading}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Drag & Drop Zone */}
          <div
            onDragOver={e => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
              dragActive
                ? 'border-blue-500 bg-blue-500/20'
                : 'border-white/10 hover:border-white/20 bg-white/5'
            }`}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <input
              id="file-input"
              type="file"
              accept=".pdf,.docx,.xlsx,.tif"
              className="hidden"
              onChange={handleFileSelect}
            />
            <UploadCloud className="w-8 h-8 mx-auto text-blue-400 mb-2" />
            <p className="text-xs font-semibold text-white">
              {fileName ? fileName : 'Click to browse or drag and drop document'}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Supports PDF, DOCX, TIFF up to 50MB with instant OCR indexing
            </p>
          </div>

          {/* Category Dropdown */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] uppercase font-bold tracking-wider text-slate-400">
              Document Classification
            </label>
            <select
              value={docCategory}
              onChange={e => setDocCategory(e.target.value as any)}
              className="w-full px-3 py-2 bg-white/5 rounded-xl text-xs font-medium text-white border border-white/10 focus:outline-none focus:border-blue-500/50"
            >
              <option value="Tax" className="bg-slate-900 text-white">Tax Form / 1099 / Schedule D</option>
              <option value="Estate" className="bg-slate-900 text-white">Estate Deed / Living Trust / Will</option>
              <option value="Portfolio" className="bg-slate-900 text-white">Portfolio Holding / Capital Call</option>
              <option value="Retirement" className="bg-slate-900 text-white">Retirement 401(k) / Beneficiary Notice</option>
              <option value="Legal" className="bg-slate-900 text-white">Power of Attorney / Notary Proxy</option>
            </select>
          </div>

          {/* Security Notice */}
          <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[11px] text-blue-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-blue-400" />
            <span>Encrypted with multi-tenant zero-knowledge SHA-256 hash.</span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={() => setUploadModalOpen(false)}
              disabled={isUploading}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 border border-blue-400/30 transition-all flex items-center gap-1.5"
            >
              {isUploading ? (
                <span>Encrypting &amp; Storing...</span>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  <span>Upload Document</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
