import { useState } from 'react';
import { useRole } from '@/context/RoleContext';
import { VEHICLES, Vehicle, FuelType, VehicleStatus, ComplianceStatus } from '@/data/dashboardData';
import {
  Car,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  X,
  Fuel,
  ShieldAlert,
  ShieldCheck,
  PauseCircle,
  PlayCircle,
} from 'lucide-react';

export function FleetPage() {
  const { role } = useRole();
  const [vehicles, setVehicles] = useState<Vehicle[]>(VEHICLES);
  const [search, setSearch] = useState('');
  const [fuelFilter, setFuelFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);

  // New vehicle form state
  const [newVehicle, setNewVehicle] = useState({
    plate: '',
    model: '',
    fuelType: 'CNG' as FuelType,
    vendorName: role.vendorName,
    driverName: '',
  });

  // Scoped Fleet according to RBAC
  const scopedVehicles = vehicles.filter((veh) => {
    if (role.id === 'super_vendor') return true;
    if (role.id === 'regional_vendor') return veh.vendorId.startsWith('v-punjab') || veh.vendorId.startsWith('v-haryana') || veh.vendorId === 'v-north' || veh.vendorId === 'v-amritsar';
    if (role.id === 'city_vendor') return veh.vendorId === 'v-punjab' || veh.vendorId === 'v-amritsar';
    return veh.vendorId === 'v-amritsar';
  });

  const filteredVehicles = scopedVehicles.filter((v) => {
    const matchesSearch =
      v.plate.toLowerCase().includes(search.toLowerCase()) ||
      v.model.toLowerCase().includes(search.toLowerCase()) ||
      (v.driverName && v.driverName.toLowerCase().includes(search.toLowerCase())) ||
      v.vendorName.toLowerCase().includes(search.toLowerCase());
    const matchesFuel = fuelFilter === 'all' || v.fuelType === fuelFilter;
    const matchesStatus = statusFilter === 'all' || v.status === statusFilter;
    return matchesSearch && matchesFuel && matchesStatus;
  });

  const handleToggleHold = (id: string) => {
    setVehicles((prev) =>
      prev.map((v) => {
        if (v.id === id) {
          const nextStatus: VehicleStatus = v.status === 'Hold' ? 'Active' : 'Hold';
          return { ...v, status: nextStatus };
        }
        return v;
      })
    );
  };

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVehicle.plate || !newVehicle.model) return;

    const added: Vehicle = {
      id: `cab-${Date.now()}`,
      plate: newVehicle.plate.toUpperCase().replace(/\s+/g, ''),
      model: newVehicle.model,
      fuelType: newVehicle.fuelType,
      vendorId: role.id === 'local_vendor' ? 'v-amritsar' : 'v-punjab',
      vendorName: role.vendorName,
      driverId: null,
      driverName: newVehicle.driverName || null,
      status: 'Active',
      compliance: 'Valid',
      insuranceExpiry: '2027-12-31',
      rcExpiry: '2029-01-01',
      permitExpiry: '2028-06-30',
      registeredAt: new Date().toISOString().split('T')[0],
    };

    setVehicles([added, ...vehicles]);
    setIsSlideOverOpen(false);
    setNewVehicle({
      plate: '',
      model: '',
      fuelType: 'CNG',
      vendorName: role.vendorName,
      driverName: '',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-foreground">Fleet Operations</h1>
            <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              {scopedVehicles.length} Registered Cabs
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Vehicle compliance registry, permit tracking, and instantaneous dispatch suspension holds.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsSlideOverOpen(true)}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:opacity-95 transition-all shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Onboard Vehicle
        </button>
      </div>

      {/* Filter toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by license plate, car model, or driver..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-border/70 bg-card text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={fuelFilter}
            onChange={(e) => setFuelFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-border/70 bg-card text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="all">All Fuels</option>
            <option value="CNG">CNG</option>
            <option value="EV">Electric (EV)</option>
            <option value="Diesel">Diesel</option>
            <option value="Petrol">Petrol</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-border/70 bg-card text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="all">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Hold">On Hold</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>
      </div>

      {/* Fleet Table */}
      <div className="rounded-xl border border-border/70 bg-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border/60 bg-muted/40 text-muted-foreground font-semibold">
                <th className="py-3 px-4">Registration Plate</th>
                <th className="py-3 px-4">Vehicle Model</th>
                <th className="py-3 px-4">Fuel</th>
                <th className="py-3 px-4">Assigned Driver</th>
                <th className="py-3 px-4">Managing Vendor</th>
                <th className="py-3 px-4">Regulatory Audit</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Dispatch Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filteredVehicles.map((vehicle) => {
                const isHold = vehicle.status === 'Hold';
                return (
                  <tr key={vehicle.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-mono font-bold text-foreground tracking-wide text-xs">
                        {vehicle.plate}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-foreground">
                      {vehicle.model}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-muted text-foreground/80 border border-border/60">
                        <Fuel className="h-3 w-3 text-muted-foreground" />
                        {vehicle.fuelType}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {vehicle.driverName ? (
                        <span className="text-foreground font-medium">{vehicle.driverName}</span>
                      ) : (
                        <span className="text-muted-foreground/60 italic">Unassigned</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground text-[11px]">
                      {vehicle.vendorName}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold ${
                          vehicle.compliance === 'Valid'
                            ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10'
                            : vehicle.compliance === 'Expiring Soon'
                            ? 'text-amber-600 dark:text-amber-400 bg-amber-500/10'
                            : 'text-destructive bg-destructive/10'
                        }`}
                      >
                        {vehicle.compliance === 'Valid' ? (
                          <ShieldCheck className="h-3 w-3" />
                        ) : (
                          <ShieldAlert className="h-3 w-3" />
                        )}
                        {vehicle.compliance}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium ${
                          vehicle.status === 'Active'
                            ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/40'
                            : vehicle.status === 'Hold'
                            ? 'text-destructive bg-destructive/10 font-semibold'
                            : 'text-muted-foreground bg-muted'
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {vehicle.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleToggleHold(vehicle.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold border transition-colors ${
                          isHold
                            ? 'border-emerald-600/30 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
                            : 'border-destructive/30 text-destructive hover:bg-destructive/10'
                        }`}
                      >
                        {isHold ? (
                          <>
                            <PlayCircle className="h-3 w-3" /> Release
                          </>
                        ) : (
                          <>
                            <PauseCircle className="h-3 w-3" /> Hold
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over Drawer for Add Vehicle */}
      {isSlideOverOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-card border-l border-border h-full p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-border/60 pb-4">
                <div>
                  <h2 className="text-base font-bold text-foreground">Onboard New Fleet Vehicle</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Regulatory document proofs verified prior to route allocation.
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

              <form id="add-vehicle-form" onSubmit={handleAddVehicle} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-foreground block mb-1">Registration Plate Number</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. PB 10 AB 4920"
                    value={newVehicle.plate}
                    onChange={(e) => setNewVehicle({ ...newVehicle, plate: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground font-mono uppercase focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <span className="text-[10px] text-muted-foreground mt-1 block">
                    Must adhere to standard state RTO registration formats.
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-foreground block mb-1">Make & Model</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maruti Dzire"
                      value={newVehicle.model}
                      onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-foreground block mb-1">Fuel Type</label>
                    <select
                      value={newVehicle.fuelType}
                      onChange={(e) => setNewVehicle({ ...newVehicle, fuelType: e.target.value as FuelType })}
                      className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="CNG">CNG</option>
                      <option value="EV">Electric (EV)</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Petrol">Petrol</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">Initial Assigned Driver (Optional)</label>
                  <input
                    type="text"
                    placeholder="Driver full name if already rostered"
                    value={newVehicle.driverName}
                    onChange={(e) => setNewVehicle({ ...newVehicle, driverName: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="p-3 rounded-lg border border-border/70 bg-muted/30 space-y-2">
                  <span className="font-semibold text-foreground block">Required Onboarding Proofs</span>
                  <div className="text-[11px] text-muted-foreground space-y-1">
                    <p>✓ Registration Certificate (RC) PDF / Smart Card</p>
                    <p>✓ Commercial Taxi Permit (State / All India)</p>
                    <p>✓ Valid Comprehensive / Third Party Taxi Insurance</p>
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
                form="add-vehicle-form"
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-95"
              >
                Onboard Vehicle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FleetPage;
