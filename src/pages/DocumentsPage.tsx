import React, { useState } from 'react';
import {
  FileText,
  Upload,
  Download,
  Search,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Share2,
  Trash2,
  Clock,
  ShieldCheck,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DOCUMENTS_LIST } from '../data/mockData';
import { DocumentItem } from '../types';

export const DocumentsPage: React.FC = () => {
  const { setUploadModalOpen, addToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);

  const categories = ['ALL', 'Tax', 'Estate', 'Statements', 'Compliance'];

  const filteredDocs = DOCUMENTS_LIST.filter(doc => {
    const matchSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = selectedCategory === 'ALL' || doc.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const handleDownload = (doc: DocumentItem) => {
    addToast(
      'Document Download Started',
      `Decrypted and downloaded "${doc.title}" via TLS 1.3 secure channel.`,
      'success'
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-1">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Documents &amp; Vault
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
              AES-256 Vault
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            End-to-end encrypted fiduciary document repository, custodial statements, and e-signatures.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() =>
              addToast(
                'Archive Export Initialized',
                'All 42 active fiduciary vault files queued for batch ZIP download.',
                'info'
              )
            }
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download All (ZIP)</span>
          </button>
          <button
            onClick={() => setUploadModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 border border-blue-400/30 active:scale-95 transition-all"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Document</span>
          </button>
        </div>
      </div>

      {/* 2. Vault Security & Storage KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:border-white/20 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Total Documents
            </span>
            <span className="text-[10px] text-blue-400 font-bold">Encrypted</span>
          </div>
          <div className="my-1.5">
            <div className="text-2xl font-extrabold text-white">42 Files</div>
            <span className="text-xs text-slate-400">Across 4 asset categories</span>
          </div>
          <span className="text-[11px] text-slate-400">SOC-2 Type II Fiduciary Storage</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:border-white/20 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Storage Utilized
            </span>
            <span className="text-[10px] text-slate-400">Cloud Vault</span>
          </div>
          <div className="my-1.5">
            <div className="text-2xl font-extrabold text-white">3.4 GB</div>
            <span className="text-xs text-slate-400">of 50.0 GB Tier Limit</span>
          </div>
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full" style={{ width: '7%' }} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:border-white/20 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Signatures Pending
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] font-bold">
              1 Required
            </span>
          </div>
          <div className="my-1.5">
            <div className="text-2xl font-extrabold text-amber-400">1 Document</div>
            <span className="text-xs text-slate-400">2026 Roth Conversion Form</span>
          </div>
          <span className="text-[11px] text-amber-400 font-medium">Charles Schwab DocuSign</span>
        </div>

        <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:border-white/20 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Audit Hash Ledger
            </span>
            <span className="text-[10px] font-bold text-blue-400">SHA-256</span>
          </div>
          <div className="my-1.5">
            <div className="text-2xl font-extrabold text-blue-400">Verified</div>
            <span className="text-xs text-slate-400">100% Immutable Integrity</span>
          </div>
          <span className="text-[11px] text-slate-400">Zero tampering detected</span>
        </div>
      </div>

      {/* 3. Document Filter & Search Toolbar */}
      <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 p-1 rounded-xl text-xs font-semibold overflow-x-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat === 'ALL' ? 'All Documents' : cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search documents, dates, types..."
              className="w-full pl-9 pr-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
            />
          </div>
        </div>

        {/* Document Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-white/5 text-slate-400 font-bold uppercase text-[10px]">
                <th className="py-3 px-3 rounded-l-lg">Document Name</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Date Added</th>
                <th className="py-3 px-3">File Size</th>
                <th className="py-3 px-3 text-center">Signature Status</th>
                <th className="py-3 px-3 text-center rounded-r-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-200">
              {filteredDocs.map(doc => (
                <tr key={doc.id} className="hover:bg-white/10 transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-white block">
                          {doc.title}
                        </span>
                        <span className="text-[11px] text-slate-400">PDF · Verified Fiduciary Hash</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-slate-300">{doc.category}</td>
                  <td className="py-3 px-3 text-slate-400">{doc.date}</td>
                  <td className="py-3 px-3 text-slate-400">{doc.size}</td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        doc.status === 'Signed'
                          ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300'
                          : doc.status === 'Needs Signature'
                          ? 'bg-amber-500/20 border border-amber-500/30 text-amber-300'
                          : 'bg-white/10 text-slate-300'
                      }`}
                    >
                      {doc.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => setPreviewDoc(doc)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-white/10 transition-colors"
                        title="Quick Preview"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDownload(doc)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
          <span>Showing {filteredDocs.length} of {DOCUMENTS_LIST.length} vault assets</span>
          <span className="flex items-center gap-1 text-blue-400 font-medium">
            <Lock className="w-3.5 h-3.5" />
            Client Private Key Protected
          </span>
        </div>
      </div>

      {/* 4. Quick Document Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="fixed inset-0" onClick={() => setPreviewDoc(null)} />
          <div className="relative w-full max-w-lg bg-[#0F172A]/90 backdrop-blur-xl rounded-2xl shadow-[0_16px_48px_0_rgba(0,0,0,0.6)] border border-white/10 p-6 flex flex-col gap-4 z-10 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">
                    {previewDoc.title}
                  </h3>
                  <span className="text-xs text-slate-400">{previewDoc.category} · {previewDoc.size}</span>
                </div>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Details Digest */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Upload Date:</span>
                <span className="font-medium text-slate-200">{previewDoc.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Custodian / Originator:</span>
                <span className="font-medium text-slate-200">Charles Schwab &amp; Co.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Signature Requirement:</span>
                <span className="font-bold text-blue-400">{previewDoc.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">SHA-256 Digest:</span>
                <span className="font-mono text-[10px] text-slate-400">8f4c2b9a...71e30d</span>
              </div>
            </div>

            {/* Preview Body Illustration */}
            <div className="h-40 rounded-xl bg-white/5 flex flex-col items-center justify-center text-center p-4 border border-dashed border-white/20">
              <ShieldCheck className="w-8 h-8 text-blue-400 mb-1" />
              <span className="text-xs font-bold text-white">
                Encrypted Fiduciary Artifact
              </span>
              <span className="text-[11px] text-slate-400 max-w-xs mt-0.5">
                Ready for high-resolution viewing or export via verified signature chain.
              </span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleDownload(previewDoc);
                  setPreviewDoc(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 border border-blue-400/30 flex items-center gap-1.5 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Secure Copy</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
