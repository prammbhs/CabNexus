import { useState } from 'react';
import { 
  Building2, 
  Users, 
  ShieldCheck, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';

interface ProductPreviewProps {
  onOpenDashboard?: () => void;
}

export function ProductPreview({ onOpenDashboard }: ProductPreviewProps) {
  const [activeTab, setActiveTab] = useState<'vendors' | 'drivers' | 'compliance'>('vendors');

  return (
    <section className="py-16 sm:py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="outline" className="text-xs font-semibold px-2.5 py-0.5">
            Application Surface Previews
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground">
            Experience the actual product.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Take a closer look at the key operational interfaces designed for speed, clarity, and zero-loss dispatch governance.
          </p>
        </div>

        {/* Tab selection */}
        <div className="mt-10 flex items-center justify-center">
          <div className="inline-flex p-1.5 rounded-xl bg-muted/60 border border-border/80 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('vendors')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === 'vendors' 
                  ? 'bg-card text-foreground shadow-xs' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Building2 className="h-4 w-4" />
              <span>Vendor Management</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('drivers')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === 'drivers' 
                  ? 'bg-card text-foreground shadow-xs' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Driver Management</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('compliance')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === 'compliance' 
                  ? 'bg-card text-foreground shadow-xs' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Compliance Vault</span>
            </button>
          </div>
        </div>

        {/* Interactive Tab Showcase Content */}
        <div className="mt-8 max-w-4xl mx-auto rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-lg">
          
          {/* TAB 1: Vendor Management */}
          {activeTab === 'vendors' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-border/60">
                <div>
                  <h3 className="text-base font-bold text-foreground">Multi-Tier Network Topography</h3>
                  <p className="text-xs text-muted-foreground">Regional Hubs &rarr; City Franchises &rarr; Local Fleet Operators</p>
                </div>
                <Badge variant="outline" className="self-start sm:self-auto font-mono text-xs">
                  42 Active Vendors
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-1">
                  <span className="text-xs text-muted-foreground">National Hub</span>
                  <div className="text-lg font-bold text-foreground">Super Vendor India</div>
                  <span className="text-[11px] text-primary font-semibold">Tier 1 • Root Node</span>
                </div>
                <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-1">
                  <span className="text-xs text-muted-foreground">Regional Divisions</span>
                  <div className="text-lg font-bold text-foreground">North &amp; South Hubs</div>
                  <span className="text-[11px] text-emerald-500 font-semibold">Tier 2 • Regional Hubs</span>
                </div>
                <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-1">
                  <span className="text-xs text-muted-foreground">Operating Fleets</span>
                  <div className="text-lg font-bold text-foreground">Punjab, Haryana, etc.</div>
                  <span className="text-[11px] text-blue-500 font-semibold">Tier 3 &amp; 4 • Local Contractors</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-xs text-muted-foreground flex items-center justify-between">
                <span>Enforces strict parent-child access control with arbitrary tree depth support.</span>
                <span className="font-semibold text-primary">Fully Interactive</span>
              </div>
            </div>
          )}

          {/* TAB 2: Driver Management */}
          {activeTab === 'drivers' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-border/60">
                <div>
                  <h3 className="text-base font-bold text-foreground">KYC &amp; Driver Allocation Center</h3>
                  <p className="text-xs text-muted-foreground">License verification, police clearance, and cab pairing</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-foreground">920 Total Drivers</span>
                  <span className="text-xs text-emerald-500">• 860 Active</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                  <span className="text-xs text-muted-foreground">Verified &amp; Assigned</span>
                  <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">860</div>
                  <span className="text-[11px] text-muted-foreground">Ready for passenger trips</span>
                </div>
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1">
                  <span className="text-xs text-muted-foreground">Pending KYC Review</span>
                  <div className="text-2xl font-black text-amber-600 dark:text-amber-400">60</div>
                  <span className="text-[11px] text-muted-foreground">Awaiting document check</span>
                </div>
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-1">
                  <span className="text-xs text-muted-foreground">Suspended / Inactive</span>
                  <div className="text-2xl font-black text-rose-600 dark:text-rose-400">20</div>
                  <span className="text-[11px] text-muted-foreground">Compliance or policy hold</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-muted/30 border border-border/60 text-xs text-muted-foreground flex items-center justify-between">
                <span>Atomic allocation prevents any driver from being double-assigned to two active cabs.</span>
                <span className="font-semibold text-emerald-500">Conflict Guard Active</span>
              </div>
            </div>
          )}

          {/* TAB 3: Compliance */}
          {activeTab === 'compliance' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-border/60">
                <div>
                  <h3 className="text-base font-bold text-foreground">30-Day Proactive Compliance Vault</h3>
                  <p className="text-xs text-muted-foreground">Automated tracking for RC, Insurance, Permits, and Pollution certificates</p>
                </div>
                <Badge variant="warning" className="self-start sm:self-auto text-xs">
                  Automated Alert Engine
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-700 dark:text-amber-300">Expiring Soon (34 Records)</span>
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Vehicles within the 30-day window receive immediate renewal notifications sent directly to their sub-vendor manager.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-700 dark:text-rose-300">Expired &amp; On Hold (12 Records)</span>
                    <ShieldCheck className="h-4 w-4 text-rose-500" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Vehicles with expired statutory papers are automatically placed on Compliance Hold, preventing illegal dispatch.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-muted/30 border border-border/60 text-xs text-muted-foreground flex items-center justify-between">
                <span>Super Vendors can perform one-click overrides with logged reason notes.</span>
                <span className="font-semibold text-primary">Override Enabled</span>
              </div>
            </div>
          )}

          {/* Action button linking to Dashboard */}
          <div className="pt-6 border-t border-border/60 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Ready to test the operational workflow?</span>
            <Button
              onClick={onOpenDashboard}
              className="text-xs font-bold bg-primary text-primary-foreground"
            >
              <span>Explore the Platform</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
            </Button>
          </div>

        </div>

      </div>
    </section>
  );
}
