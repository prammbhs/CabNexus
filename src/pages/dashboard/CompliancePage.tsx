import { useState, useRef } from 'react';
import { useRole } from '@/context/RoleContext';
import { COMPLIANCE_DOCS, ComplianceDoc, DocStatus, DocType, VEHICLES, DRIVERS } from '@/data/dashboardData';
import {
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Clock,
  Filter,
  Search,
  CheckCircle2,
  FileText,
  AlertCircle,
  ExternalLink,
  Upload,
  X,
  FileUp,
  FileCheck2,
  Check,
  Ban,
} from 'lucide-react';

export function CompliancePage() {
  const { role, currentUser } = useRole();
  const [docs, setDocs] = useState<ComplianceDoc[]>(COMPLIANCE_DOCS);
  const [activeTab, setActiveTab] = useState<'all' | 'expiring' | 'expired' | 'pending'>('all');
  const [search, setSearch] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // File upload state
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadEntityType, setUploadEntityType] = useState<'Vehicle' | 'Driver'>('Vehicle');
  const [uploadEntityId, setUploadEntityId] = useState<string>('cab-001');
  const [uploadDocType, setUploadDocType] = useState<DocType>('Insurance');
  const [uploadExpiry, setUploadExpiry] = useState<string>('2028-12-31');

  // Scoped docs based on logged in vendor
  const scopedDocs = docs.filter((doc) => {
    if (role.id === 'super_vendor') return true;
    if (role.id === 'regional_vendor') return doc.vendorId.startsWith('v-punjab') || doc.vendorId.startsWith('v-haryana') || doc.vendorId === 'v-north' || doc.vendorId === 'v-amritsar';
    if (role.id === 'city_vendor') return doc.vendorId === 'v-punjab' || doc.vendorId === 'v-amritsar';
    return doc.vendorId === 'v-amritsar';
  });

  const filteredDocs = scopedDocs.filter((doc) => {
    const matchesSearch =
      doc.entityName.toLowerCase().includes(search.toLowerCase()) ||
      doc.docType.toLowerCase().includes(search.toLowerCase()) ||
      doc.vendorName.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (activeTab === 'expiring') return doc.status === 'Expiring Soon';
    if (activeTab === 'expired') return doc.status === 'Expired';
    if (activeTab === 'pending') return doc.status === 'Pending Approval';
    return true;
  });

  const expiringCount = scopedDocs.filter((d) => d.status === 'Expiring Soon').length;
  const expiredCount = scopedDocs.filter((d) => d.status === 'Expired').length;
  const pendingCount = scopedDocs.filter((d) => d.status === 'Pending Approval').length;
  const validCount = scopedDocs.filter((d) => d.status === 'Valid').length;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    let entityName = '';
    if (uploadEntityType === 'Vehicle') {
      const match = VEHICLES.find((v) => v.id === uploadEntityId);
      entityName = match ? `${match.plate} · ${match.model}` : uploadEntityId;
    } else {
      const match = DRIVERS.find((d) => d.id === uploadEntityId);
      entityName = match ? match.name : uploadEntityId;
    }

    const newDoc: ComplianceDoc = {
      id: `doc-${Date.now()}`,
      docType: uploadDocType,
      entityType: uploadEntityType,
      entityId: uploadEntityId,
      entityName,
      vendorId: currentUser.vendorId,
      vendorName: currentUser.vendorName,
      expiryDate: uploadExpiry,
      daysLeft: Math.round((new Date(uploadExpiry).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
      status: 'Pending Approval',
      fileName: selectedFile.name,
      uploadedAt: new Date().toISOString().split('T')[0],
      uploadedBy: currentUser.name,
    };

    setDocs([newDoc, ...docs]);
    setIsUploadModalOpen(false);
    setSelectedFile(null);
  };

  const handleApproveDoc = (id: string) => {
    setDocs((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'Valid' as DocStatus } : d))
    );
  };

  const handleRejectDoc = (id: string) => {
    setDocs((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'Expired' as DocStatus } : d))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-foreground">Compliance & Document Ledger</h1>
            <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              {scopedDocs.length} Verified Records
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Automated expiration countdowns with document verification and dispatch block controls.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsUploadModalOpen(true)}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:opacity-95 transition-all shadow-sm"
        >
          <Upload className="h-4 w-4" />
          Upload Compliance Document
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">Valid</span>
            <div className="text-xl sm:text-2xl font-bold text-foreground mt-1">{validCount}</div>
            <span className="text-[10px] text-muted-foreground">Audit cleared</span>
          </div>
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="h-4 w-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-blue-500/20 bg-blue-500/5 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-blue-700 dark:text-blue-400">Pending Audit</span>
            <div className="text-xl sm:text-2xl font-bold text-blue-700 dark:text-blue-300 mt-1">{pendingCount}</div>
            <span className="text-[10px] text-muted-foreground">Requires sign-off</span>
          </div>
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <FileUp className="h-4 w-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-amber-500/20 bg-amber-500/5 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">Expiring ≤30d</span>
            <div className="text-xl sm:text-2xl font-bold text-foreground mt-1">{expiringCount}</div>
            <span className="text-[10px] text-muted-foreground">Renewal notice sent</span>
          </div>
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Clock className="h-4 w-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-destructive/20 bg-destructive/5 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-destructive">Expired (Hold)</span>
            <div className="text-xl sm:text-2xl font-bold text-destructive mt-1">{expiredCount}</div>
            <span className="text-[10px] text-muted-foreground">Dispatch halted</span>
          </div>
          <div className="p-2 rounded-lg bg-destructive/10 text-destructive">
            <ShieldAlert className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Filter and Tab bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Tabs */}
        <div className="flex items-center p-1 rounded-lg border border-border/70 bg-card gap-1 text-xs overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            All Docs ({scopedDocs.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pending')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
              activeTab === 'pending'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Pending Approval ({pendingCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('expiring')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
              activeTab === 'expiring'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Expiring Soon ({expiringCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('expired')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
              activeTab === 'expired'
                ? 'bg-destructive text-destructive-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Expired ({expiredCount})
          </button>
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search document type, vehicle or driver..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-border/70 bg-card text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Compliance Table */}
      <div className="rounded-xl border border-border/70 bg-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border/60 bg-muted/40 text-muted-foreground font-semibold">
                <th className="py-3 px-4">Entity & Identifier</th>
                <th className="py-3 px-4">Document Type & File</th>
                <th className="py-3 px-4">Managing Sub-Tier</th>
                <th className="py-3 px-4">Expiration Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Verification Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filteredDocs.map((doc) => {
                const isExpired = doc.status === 'Expired';
                const isExpiring = doc.status === 'Expiring Soon';
                const isPending = doc.status === 'Pending Approval';

                return (
                  <tr key={doc.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-semibold text-foreground block">{doc.entityName}</span>
                        <span className="text-[10px] text-muted-foreground uppercase font-mono tracking-wider">
                          Type: {doc.entityType}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5">
                        <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
                          <FileText className="h-3.5 w-3.5 text-primary" />
                          {doc.docType}
                        </span>
                        {doc.fileName && (
                          <span className="text-[11px] text-muted-foreground block font-mono truncate max-w-[180px]">
                            {doc.fileName}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-muted-foreground text-[11px]">
                      {doc.vendorName}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-foreground/90">
                      <div>{doc.expiryDate}</div>
                      <span className="text-[10px] text-muted-foreground">
                        {isExpired ? `Overdue ${Math.abs(doc.daysLeft)}d` : `${doc.daysLeft}d left`}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-semibold ${
                          doc.status === 'Valid'
                            ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                            : doc.status === 'Expiring Soon'
                            ? 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20'
                            : doc.status === 'Pending Approval'
                            ? 'text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20'
                            : 'text-destructive bg-destructive/10 border border-destructive/20'
                        }`}
                      >
                        {doc.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {isPending ? (
                        currentUser.roleId !== 'driver' && (currentUser.roleId === 'super_vendor' || currentUser.permissions.canApproveCompliance) ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleApproveDoc(doc.id)}
                              className="inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-sm"
                              title="Approve Document"
                            >
                              <Check className="h-3 w-3" /> Approve
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRejectDoc(doc.id)}
                              className="inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold bg-destructive text-white hover:opacity-90 transition-opacity"
                              title="Reject Document"
                            >
                              <Ban className="h-3 w-3" /> Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] text-muted-foreground italic px-2 py-1 bg-muted/60 rounded border border-border/50">
                            Awaiting Authorized Vendor / Super Vendor Approval
                          </span>
                        )
                      ) : (
                        <button
                          type="button"
                          onClick={() => alert(`Document proof (${doc.fileName || doc.docType}) verified in compliance ledger.`)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold border border-border hover:bg-muted transition-colors text-foreground"
                        >
                          <ExternalLink className="h-3 w-3" /> Audit Record
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Mock File Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-card border border-border rounded-xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div>
                <h2 className="text-base font-bold text-foreground">Upload Compliance Document</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Native filesystem selector with simulated verification audit queue.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
              {/* Native File Input Trigger Area */}
              <div>
                <label className="font-semibold text-foreground block mb-1">Select File from Device</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.png,.jpg,.jpeg"
                  className="hidden"
                  id="compliance-file-input"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-border rounded-xl p-5 text-center hover:border-primary/70 hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-2"
                >
                  <FileUp className="h-8 w-8 text-primary" />
                  {selectedFile ? (
                    <div>
                      <p className="font-bold text-foreground text-xs">{selectedFile.name}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {(selectedFile.size / 1024).toFixed(1)} KB · Ready to queue
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="font-semibold text-foreground text-xs">Click to browse your computer filesystem</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        Accepts PDF, SmartCard scan, PNG or JPG (RC, Permit, Insurance, DL)
                      </p>
                    </div>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-foreground block mb-1">Target Entity Type</label>
                  <select
                    value={uploadEntityType}
                    onChange={(e) => setUploadEntityType(e.target.value as any)}
                    className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="Vehicle">Vehicle (Commercial Cab)</option>
                    <option value="Driver">Driver (Personnel)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">Document Category</label>
                  <select
                    value={uploadDocType}
                    onChange={(e) => setUploadDocType(e.target.value as DocType)}
                    className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="Insurance">Taxi Insurance Policy</option>
                    <option value="RC">Registration Certificate (RC)</option>
                    <option value="Permit">State / National Permit</option>
                    <option value="Driving License">Commercial Driving License (DL)</option>
                    <option value="PUC">Pollution Certificate (PUC)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-foreground block mb-1">Select Entity</label>
                  <select
                    value={uploadEntityId}
                    onChange={(e) => setUploadEntityId(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    {uploadEntityType === 'Vehicle'
                      ? VEHICLES.map((v) => (
                          <option key={v.id} value={v.id}>
                            {v.plate} ({v.model})
                          </option>
                        ))
                      : DRIVERS.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name} ({d.licenseNo})
                          </option>
                        ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">Document Expiry Date</label>
                  <input
                    type="date"
                    required
                    value={uploadExpiry}
                    onChange={(e) => setUploadExpiry(e.target.value)}
                    className="w-full p-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="p-3 rounded-lg border border-border/70 bg-muted/30">
                <span className="font-semibold text-foreground block mb-0.5">Verification Policy Note</span>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Uploaded files automatically enter the <strong>Pending Approval</strong> queue. Authorizing personnel can immediately review, inspect, and approve or reject documents.
                </p>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-border text-xs font-semibold text-foreground hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!selectedFile}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-95 disabled:opacity-50"
                >
                  Queue for Audit Approval
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompliancePage;
