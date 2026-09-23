import { useState } from 'react';
import { useRole } from '@/context/RoleContext';
import { DRIVERS, Driver, DriverStatus } from '@/data/dashboardData';
import {
  Users,
  Plus,
  Search,
  CheckCircle2,
  AlertCircle,
  X,
  Phone,
  Car,
  FileCheck,
  AlertTriangle,
  Clock,
  ShieldCheck,
} from 'lucide-react';

export function DriversPage() {
  const { role } = useRole();
  const [drivers, setDrivers] = useState<Driver[]>(DRIVERS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);

  // New driver form state
  const [newDriver, setNewDriver] = useState({
    name: '',
    phone: '',
    licenseNo: '',
    assignedPlate: '',
  });

  // Scoped according to RBAC
  const scopedDrivers = drivers.filter((drv) => {
    if (role.id === 'super_vendor') return true;
    if (role.id === 'regional_vendor') return drv.vendorId.startsWith('v-punjab') || drv.vendorId.startsWith('v-haryana') || drv.vendorId === 'v-north' || drv.vendorId === 'v-amritsar';
    if (role.id === 'city_vendor') return drv.vendorId === 'v-punjab' || drv.vendorId === 'v-amritsar';
    return drv.vendorId === 'v-amritsar';
  });

  const [formError, setFormError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((cur) => (cur === msg ? null : cur));
    }, 3500);
  };

  const filteredDrivers = scopedDrivers.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.phone.includes(search) ||
      d.licenseNo.toLowerCase().includes(search.toLowerCase()) ||
      (d.assignedPlate && d.assignedPlate.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddDriver = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const cleanPlate = newDriver.assignedPlate ? newDriver.assignedPlate.toUpperCase().replace(/\s+/g, '') : null;
    const cleanLicense = newDriver.licenseNo.trim().toUpperCase();

    if (!newDriver.name.trim() || !cleanLicense) {
      setFormError('Driver name and commercial driving license number are mandatory.');
      return;
    }

    // Check duplicate license
    const existingLicense = drivers.some(
      (d) => d.licenseNo.toUpperCase() === cleanLicense
    );
    if (existingLicense) {
      setFormError(`Duplicate License: Commercial license ${cleanLicense} is already registered in the system.`);
      return;
    }

    // Check conflict: Plate already assigned to another driver?
    if (cleanPlate) {
      const alreadyAssigned = drivers.some(
        (d) => d.assignedPlate?.toUpperCase() === cleanPlate
      );
      if (alreadyAssigned) {
        setFormError(`1:1 Conflict Invariant: Vehicle ${cleanPlate} is already bound to another active driver.`);
        return;
      }
    }

    const added: Driver = {
      id: `drv-${Date.now()}`,
      name: newDriver.name.trim(),
      phone: newDriver.phone.trim() || '+91 98000 00000',
      licenseNo: cleanLicense,
      licenseExpiry: '2029-12-31',
      vendorId: role.id === 'local_vendor' ? 'v-amritsar' : 'v-punjab',
      vendorName: role.vendorName,
      assignedVehicleId: cleanPlate ? `cab-${Date.now()}` : null,
      assignedPlate: cleanPlate,
      status: 'Active',
      kycVerified: true,
      joinedAt: new Date().toISOString().split('T')[0],
    };

    setDrivers([added, ...drivers]);
    setIsSlideOverOpen(false);
    setFormError(null);
    setNewDriver({
      name: '',
      phone: '',
      licenseNo: '',
      assignedPlate: '',
    });
    showToast(`Driver ${added.name} successfully onboarded and verified.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-foreground">Driver Registry & Roster</h1>
            <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              {scopedDrivers.length} Drivers
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Strict 1:1 cab-to-driver bindings, verified commercial licenses, and real-time KYC auditing.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsSlideOverOpen(true)}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:opacity-95 transition-all shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Onboard Driver
        </button>
      </div>

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="flex items-center gap-2 p-3 text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 rounded-lg animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Filter toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by driver name, phone, or license..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-border/70 bg-card text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-2.5 py-1.5 rounded-lg border border-border/70 bg-card text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="all">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Pending KYC">Pending KYC</option>
          <option value="Suspended">Suspended</option>
        </select>
      </div>

      {/* Drivers Table */}
      <div className="rounded-xl border border-border/70 bg-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border/60 bg-muted/40 text-muted-foreground font-semibold">
                <th className="py-3 px-4">Driver Name</th>
                <th className="py-3 px-4">Commercial License</th>
                <th className="py-3 px-4">Bound Vehicle</th>
                <th className="py-3 px-4">Managing Entity</th>
                <th className="py-3 px-4">KYC Verification</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Binding Rule</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filteredDrivers.map((driver) => (
                <tr key={driver.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <div>
                      <span className="font-semibold text-foreground block">{driver.name}</span>
                      <span className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Phone className="h-3 w-3" /> {driver.phone}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-medium text-foreground block text-xs">
                      {driver.licenseNo}
                    </span>
                    <span className="text-[10px] text-muted-foreground">Exp: {driver.licenseExpiry}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    {driver.assignedPlate ? (
                      <span className="inline-flex items-center gap-1.5 font-mono font-bold text-foreground px-2 py-0.5 rounded bg-muted/60 border border-border/60 text-[11px]">
                        <Car className="h-3 w-3 text-muted-foreground" />
                        {driver.assignedPlate}
                      </span>
                    ) : (
                      <span className="text-muted-foreground/60 italic text-[11px]">No vehicle bound</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-muted-foreground text-[11px]">
                    {driver.vendorName}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${
                        driver.kycVerified
                          ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10'
                          : 'text-amber-600 dark:text-amber-400 bg-amber-500/10'
                      }`}
                    >
                      {driver.kycVerified ? (
                        <>
                          <ShieldCheck className="h-3 w-3" /> Verified
                        </>
                      ) : (
                        <>
                          <Clock className="h-3 w-3" /> Pending Audit
                        </>
                      )}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium ${
                        driver.status === 'Active'
                          ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/40'
                          : driver.status === 'Suspended'
                          ? 'text-destructive bg-destructive/10'
                          : 'text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/40'
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {driver.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="text-[11px] font-mono text-muted-foreground">
                      {driver.assignedPlate ? '1:1 Locked' : 'Pool Standby'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDrivers.length === 0 && (
          <div className="py-12 px-4 text-center border-t border-border/40">
            <Users className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-sm font-semibold text-foreground">No drivers match your criteria</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
              Try adjusting your search query, clearing status filters, or onboard a new commercial driver.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setStatusFilter('all');
              }}
              className="mt-3 text-xs font-semibold text-primary hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Slide-over Drawer for Add Driver */}
      {isSlideOverOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-card border-l border-border h-full p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-border/60 pb-4">
                <div>
                  <h2 className="text-base font-bold text-foreground">Roster New Commercial Driver</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Validates Sarathi driving license records and enforces single-cab binding.
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

              {formError && (
                <div className="flex items-start gap-2 p-3 text-xs bg-destructive/10 border border-destructive/20 text-destructive rounded-lg animate-in fade-in">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block">Validation Error</span>
                    <span>{formError}</span>
                  </div>
                </div>
              )}

              <form id="add-driver-form" onSubmit={handleAddDriver} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-foreground block mb-1">Driver Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gurmukh Singh"
                    value={newDriver.name}
                    onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">Mobile Contact</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98XXX XXXXX"
                    value={newDriver.phone}
                    onChange={(e) => setNewDriver({ ...newDriver, phone: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">Commercial Driving License (DL)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. PB-0120-2021-0099"
                    value={newDriver.licenseNo}
                    onChange={(e) => setNewDriver({ ...newDriver, licenseNo: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground font-mono uppercase focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">Bind to Registration Plate (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. PB10AB1234"
                    value={newDriver.assignedPlate}
                    onChange={(e) => setNewDriver({ ...newDriver, assignedPlate: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground font-mono uppercase focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <span className="text-[10px] text-muted-foreground mt-1 block">
                    Strict rule: Each cab can only have 1 active driver bound.
                  </span>
                </div>

                <div className="p-3 rounded-lg border border-border/70 bg-muted/30 space-y-2">
                  <span className="font-semibold text-foreground block">KYC Verification Checklist</span>
                  <div className="text-[11px] text-muted-foreground space-y-1">
                    <p>✓ Aadhaar biometric verification</p>
                    <p>✓ Police background verification certificate</p>
                    <p>✓ Commercial badge authorization</p>
                  </div>
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
                form="add-driver-form"
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-95"
              >
                Complete Onboarding
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DriversPage;
