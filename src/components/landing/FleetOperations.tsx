import { useState } from 'react';
import { 
  Car, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';
import { Badge } from '@/components/common/Badge';
import { FLEET_PREVIEW_ROWS } from '@/data/landingData';

interface FleetOperationsProps {
  onOpenDashboard?: () => void;
}

export function FleetOperations({ onOpenDashboard }: FleetOperationsProps) {
  const [filterFuel, setFilterFuel] = useState<string>('ALL');

  const filteredRows = filterFuel === 'ALL'
    ? FLEET_PREVIEW_ROWS
    : FLEET_PREVIEW_ROWS.filter(r => r.fuelType === filterFuel);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge variant="success">Active</Badge>;
      case 'Hold':
        return <Badge variant="destructive">Compliance Hold</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getFuelBadge = (fuel: string) => {
    switch (fuel) {
      case 'CNG': return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">CNG</span>;
      case 'EV': return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/15 text-blue-600 dark:text-blue-400">Electric</span>;
      case 'Diesel': return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400">Diesel</span>;
      default: return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-muted text-muted-foreground">{fuel}</span>;
    }
  };

  return (
    <section id="operations" className="py-16 sm:py-24 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Realistic Fleet Inventory Table */}
          <div className="lg:col-span-7 rounded-lg border border-border bg-card p-4 sm:p-6 shadow-card space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/60">
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-bold text-foreground">Fleet Operations Roster</h3>
              </div>
              
              <div className="flex items-center gap-1.5 flex-wrap">
                {['ALL', 'CNG', 'EV', 'Diesel'].map((fuel) => (
                  <button
                    key={fuel}
                    type="button"
                    onClick={() => setFilterFuel(fuel)}
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                      filterFuel === fuel
                        ? 'bg-primary text-primary-foreground shadow-xs'
                        : 'bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {fuel}
                  </button>
                ))}
              </div>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border/60 text-muted-foreground">
                    <th className="pb-2.5 font-semibold">Vehicle</th>
                    <th className="pb-2.5 font-semibold">Driver</th>
                    <th className="pb-2.5 font-semibold hidden sm:table-cell">Vendor</th>
                    <th className="pb-2.5 font-semibold">Fuel</th>
                    <th className="pb-2.5 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {filteredRows.map((row) => (
                    <tr key={row.plate} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3">
                        <div className="font-mono font-bold text-foreground">{row.plate}</div>
                        <div className="text-[11px] text-muted-foreground">{row.model}</div>
                      </td>
                      <td className="py-3 font-medium text-foreground">
                        {row.driver}
                      </td>
                      <td className="py-3 text-muted-foreground hidden sm:table-cell">
                        {row.vendor}
                      </td>
                      <td className="py-3">
                        {getFuelBadge(row.fuelType)}
                      </td>
                      <td className="py-3 text-right">
                        {getStatusBadge(row.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-muted-foreground border-t border-border/60">
              <span>Automatic conflict check on driver binding.</span>
              <button 
                type="button" 
                onClick={onOpenDashboard}
                className="text-primary font-semibold hover:underline inline-flex items-center gap-1"
              >
                <span>View Full Fleet Table</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Right: Operational Value Proposition & Mini Stats */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <p className="section-label">Fleet Visibility</p>
              <h2 className="text-3xl sm:text-4xl text-foreground">
                Know what's happening across your fleet.
              </h2>
              <p className="text-sm leading-7 text-muted-foreground">
                Track real-time vehicle allocation, unassigned drivers, regional quotas, and compliance infractions without making a single phone call.
              </p>
            </div>

            {/* 3 Mini Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-lg border border-border bg-muted/30 text-center space-y-1">
                <div className="text-xl sm:text-2xl font-bold text-foreground tabular-nums">850</div>
                <div className="text-[11px] text-muted-foreground">Vehicles</div>
              </div>

              <div className="p-3.5 rounded-lg border border-border bg-muted/30 text-center space-y-1">
                <div className="text-xl sm:text-2xl font-bold text-foreground tabular-nums">920</div>
                <div className="text-[11px] text-muted-foreground">Drivers</div>
              </div>

              <div className="p-3.5 rounded-lg border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-900/20 text-center space-y-1">
                <div className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">96%</div>
                <div className="text-[11px] text-muted-foreground">Compliance</div>
              </div>
            </div>

            {/* Feature List */}
            <div className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Zero double-allocation: Drivers cannot be bound to two cabs simultaneously.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>CNG, EV, Petrol, Diesel inventory tagging with standardized plate regex checks.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Super Vendor intervention: One-click quarantine of rogue or expired cabs.</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
