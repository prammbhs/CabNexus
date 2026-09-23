import { useState } from 'react';
import { useRole } from '@/context/RoleContext';
import { VENDORS, Vendor } from '@/data/dashboardData';
import {
  Building2,
  Plus,
  Search,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  X,
  MapPin,
  Phone,
  User,
  GitFork,
  LayoutList,
  Layers,
  Car,
  Users,
} from 'lucide-react';

export function VendorsPage() {
  const { role, currentUser, can } = useRole();
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [search, setSearch] = useState('');
  const [expandedVendorId, setExpandedVendorId] = useState<string | null>(null);
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);

  // New vendor form state
  const [newVendor, setNewVendor] = useState({
    name: '',
    level: 3 as 1 | 2 | 3 | 4,
    parentId: currentUser.vendorId !== 'v-root' ? currentUser.vendorId : 'v-north',
    city: '',
    state: '',
    contactName: '',
    contactPhone: '',
  });

  const [vendorList, setVendorList] = useState<Vendor[]>(VENDORS);

  // Recursive tree traversal function: Collects all descendant vendor IDs under a given vendor ID
  const getSubtreeVendorIds = (startVendorId: string, vendors: Vendor[]): Set<string> => {
    const result = new Set<string>();
    result.add(startVendorId);

    const traverse = (parentId: string) => {
      const children = vendors.filter((v) => v.parentId === parentId);
      for (const child of children) {
        result.add(child.id);
        traverse(child.id);
      }
    };

    traverse(startVendorId);
    return result;
  };

  // Determine user's controlled vendor IDs via tree traversal
  const controlledVendorIds = currentUser.roleId === 'super_vendor'
    ? new Set(vendorList.map((v) => v.id))
    : getSubtreeVendorIds(currentUser.vendorId, vendorList);

  // Scope according to user's traversed subtree
  const scopedVendors = vendorList.filter((v) => controlledVendorIds.has(v.id));

  const filteredVendors = scopedVendors.filter((v) =>
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.city.toLowerCase().includes(search.toLowerCase()) ||
    v.state.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVendor.name || !newVendor.city) return;

    const added: Vendor = {
      id: `v-${Date.now()}`,
      name: newVendor.name,
      level: newVendor.level,
      parentId: newVendor.parentId,
      city: newVendor.city,
      state: newVendor.state || 'Punjab',
      contactName: newVendor.contactName || 'Lead Dispatcher',
      contactPhone: newVendor.contactPhone || '+91 98000 00000',
      status: 'Active',
      vehicles: 0,
      drivers: 0,
      complianceRate: 100,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setVendorList([added, ...vendorList]);
    setIsSlideOverOpen(false);
    setNewVendor({
      name: '',
      level: 3,
      parentId: 'v-north',
      city: '',
      state: '',
      contactName: '',
      contactPhone: '',
    });
  };

  const getSubVendors = (parentId: string) => {
    return vendorList.filter((v) => v.parentId === parentId);
  };

  // Hierarchy Tree builder: Starts from logged in user's operating vendor,
  // showing only the vendor subtree they control.
  const rootVendors = (() => {
    // If Super Vendor (L1), show top-level root
    if (currentUser.roleId === 'super_vendor' || currentUser.vendorId === 'v-root') {
      return vendorList.filter((v) => v.parentId === null);
    }
    // For any other regional manager, city manager, or local operator,
    // find their specific assigned vendor by currentUser.vendorId
    const userVendor = vendorList.find((v) => v.id === currentUser.vendorId);
    return userVendor ? [userVendor] : [];
  })();

  const renderTreeNode = (vendor: Vendor, depth: number = 0) => {
    const children = getSubVendors(vendor.id);
    const hasChildren = children.length > 0;

    return (
      <div key={vendor.id} className="relative flex flex-col items-center">
        {/* Node Card */}
        <div className={`p-4 rounded-xl border bg-card shadow-sm transition-all hover:shadow-md w-64 ${
          vendor.level === 1
            ? 'border-primary/60 ring-1 ring-primary/20 bg-primary/5'
            : vendor.level === 2
            ? 'border-blue-500/40 bg-blue-50/30 dark:bg-blue-950/20'
            : vendor.level === 3
            ? 'border-emerald-500/40 bg-emerald-50/30 dark:bg-emerald-950/20'
            : 'border-amber-500/40 bg-amber-50/30 dark:bg-amber-950/20'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
              vendor.level === 1
                ? 'bg-primary text-primary-foreground'
                : vendor.level === 2
                ? 'bg-blue-600 text-white'
                : vendor.level === 3
                ? 'bg-emerald-600 text-white'
                : 'bg-amber-600 text-white'
            }`}>
              Level {vendor.level} {vendor.level === 1 ? 'Super Vendor' : vendor.level === 2 ? 'Regional' : vendor.level === 3 ? 'City Fleet' : 'Local Fleet'}
            </span>
            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {vendor.city}
            </span>
          </div>

          <h3 className="font-bold text-foreground text-sm tracking-tight">{vendor.name}</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Contact: {vendor.contactName} ({vendor.contactPhone})
          </p>

          <div className="mt-3 pt-2.5 border-t border-border/50 grid grid-cols-3 gap-1 text-center text-[10px]">
            <div className="p-1 rounded bg-background border border-border/50">
              <span className="font-bold text-foreground block">{vendor.vehicles}</span>
              <span className="text-muted-foreground">Cabs</span>
            </div>
            <div className="p-1 rounded bg-background border border-border/50">
              <span className="font-bold text-foreground block">{vendor.drivers}</span>
              <span className="text-muted-foreground">Drivers</span>
            </div>
            <div className="p-1 rounded bg-background border border-border/50">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 block">{vendor.complianceRate}%</span>
              <span className="text-muted-foreground">Audit</span>
            </div>
          </div>
        </div>

        {/* Tree Branch Connectors */}
        {hasChildren && (
          <div className="flex flex-col items-center">
            {/* Vertical stem down from parent */}
            <div className="w-0.5 h-6 bg-border" />

            {/* Horizontal branch bar */}
            <div className="flex items-start justify-center gap-6 relative">
              {children.map((child) => (
                <div key={child.id} className="flex flex-col items-center">
                  <div className="w-0.5 h-6 bg-border" />
                  {renderTreeNode(child, depth + 1)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-foreground">Vendor Hierarchy & Topology</h1>
            <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              {scopedVendors.length} entities in scope
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Hierarchical parent-child vendor topology with delegated authorities and inherited compliance gates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center p-1 rounded-lg border border-border bg-card">
            <button
              type="button"
              onClick={() => setViewMode('map')}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                viewMode === 'map'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <GitFork className="h-3.5 w-3.5" />
              Hierarchy Tree Map
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                viewMode === 'list'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <LayoutList className="h-3.5 w-3.5" />
              Table View
            </button>
          </div>

          {can('vendors') === 'full' && (
            <button
              type="button"
              onClick={() => setIsSlideOverOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:opacity-95 transition-all shadow-sm"
            >
              <Plus className="h-4 w-4" />
              Add Sub-Vendor
            </button>
          )}
        </div>
      </div>

      {/* View Mode 1: Hierarchy Tree Map */}
      {viewMode === 'map' && (
        <div className="rounded-xl border border-border/70 bg-card p-6 shadow-sm overflow-x-auto">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-border/50">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-bold text-foreground">Interactive Delegation & Sub-Vendor Tree</h2>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-primary" /> L1 Super Vendor</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-blue-600" /> L2 Regional Hub</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-600" /> L3 City Fleet</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-600" /> L4 Local Fleet</span>
            </div>
          </div>

          <div className="min-w-[800px] flex justify-center py-4">
            {rootVendors.map((root) => renderTreeNode(root))}
          </div>
        </div>
      )}

      {/* View Mode 2: Table List View */}
      {viewMode === 'list' && (
        <>
          {/* Search bar */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by vendor name, city, or state..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-border/70 bg-card text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Vendors Table */}
          <div className="rounded-xl border border-border/70 bg-card overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border/60 bg-muted/40 text-muted-foreground font-semibold">
                    <th className="py-3 px-4">Vendor Entity</th>
                    <th className="py-3 px-4">Tier Level</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Fleet / Drivers</th>
                    <th className="py-3 px-4">Compliance Score</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Hierarchy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {filteredVendors.map((vendor) => {
                    const subVendors = getSubVendors(vendor.id);
                    const isExpanded = expandedVendorId === vendor.id;

                    return (
                      <tr key={vendor.id} className="hover:bg-muted/30 transition-colors group">
                        <td className="py-3.5 px-4">
                          <div>
                            <span className="font-semibold text-foreground block">{vendor.name}</span>
                            <span className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                              <User className="h-3 w-3" /> {vendor.contactName} · {vendor.contactPhone}
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="inline-block px-2 py-0.5 rounded border border-border/80 bg-muted/50 font-mono text-[11px] text-foreground">
                            L{vendor.level}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-foreground/80">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            {vendor.city}, {vendor.state}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-medium text-foreground">{vendor.vehicles} Cabs</span>
                          <span className="text-muted-foreground block text-[11px]">{vendor.drivers} Drivers</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1.5">
                            <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                              <div
                                className={`h-full ${
                                  vendor.complianceRate >= 95 ? 'bg-emerald-500' : 'bg-amber-500'
                                }`}
                                style={{ width: `${vendor.complianceRate}%` }}
                              />
                            </div>
                            <span className="font-mono font-semibold text-foreground text-[11px]">
                              {vendor.complianceRate}%
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${
                              vendor.status === 'Active'
                                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                                : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                            }`}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                            {vendor.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          {subVendors.length > 0 ? (
                            <button
                              type="button"
                              onClick={() => setExpandedVendorId(isExpanded ? null : vendor.id)}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
                            >
                              {subVendors.length} sub-tiers
                              {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                            </button>
                          ) : (
                            <span className="text-[11px] text-muted-foreground/60">Terminal Fleet</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Slide-over Drawer for Add Sub-Vendor */}
      {isSlideOverOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-card border-l border-border h-full p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-border/60 pb-4">
                <div>
                  <h2 className="text-base font-bold text-foreground">Register New Sub-Vendor</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Subordinates inherit parent operational compliance policies.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSlideOverOpen(false)}
                  className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form id="add-vendor-form" onSubmit={handleAddVendor} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-foreground block mb-1">Vendor Entity Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ludhiana City Fleet"
                    value={newVendor.name}
                    onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-foreground block mb-1">Hierarchy Level</label>
                    <select
                      value={newVendor.level}
                      onChange={(e) => setNewVendor({ ...newVendor, level: Number(e.target.value) as any })}
                      className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value={2}>Level 2 (Regional)</option>
                      <option value={3}>Level 3 (City Fleet)</option>
                      <option value={4}>Level 4 (Local Fleet)</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-foreground block mb-1">Parent Entity</label>
                    <select
                      value={newVendor.parentId}
                      onChange={(e) => setNewVendor({ ...newVendor, parentId: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      {vendorList.filter((v) => v.level < 4).map((v) => (
                        <option key={v.id} value={v.id}>{v.name} (L{v.level})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-foreground block mb-1">City</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ludhiana"
                      value={newVendor.city}
                      onChange={(e) => setNewVendor({ ...newVendor, city: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-foreground block mb-1">State</label>
                    <input
                      type="text"
                      placeholder="e.g. Punjab"
                      value={newVendor.state}
                      onChange={(e) => setNewVendor({ ...newVendor, state: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">Authorized Contact Person</label>
                  <input
                    type="text"
                    placeholder="Full name"
                    value={newVendor.contactName}
                    onChange={(e) => setNewVendor({ ...newVendor, contactName: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    placeholder="+91 98XXX XXXXX"
                    value={newVendor.contactPhone}
                    onChange={(e) => setNewVendor({ ...newVendor, contactPhone: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </form>
            </div>

            <div className="pt-6 border-t border-border flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsSlideOverOpen(false)}
                className="px-4 py-2 rounded-lg border border-border text-xs font-semibold text-foreground hover:bg-muted"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="add-vendor-form"
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-95"
              >
                Create Sub-Vendor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VendorsPage;
