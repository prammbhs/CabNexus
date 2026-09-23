import { useRole } from '@/context/RoleContext';
import {
  Building2,
  Car,
  Users,
  ShieldCheck,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  TrendingUp,
  FileCheck2,
  ChevronRight,
} from 'lucide-react';
import {
  VENDORS,
  VEHICLES,
  DRIVERS,
  COMPLIANCE_DOCS,
  ACTIVITY_FEED,
  DASHBOARD_KPIS,
} from '@/data/dashboardData';
import { Link } from 'react-router-dom';

export function DashboardOverview() {
  const { role, can } = useRole();

  // Scope data according to logged-in vendor's level & role
  const scopedVendors = VENDORS.filter((v) => {
    if (role.id === 'super_vendor') return true;
    if (role.id === 'regional_vendor') return v.id === 'v-north' || v.parentId === 'v-north' || v.parentId === 'v-punjab';
    if (role.id === 'city_vendor') return v.id === 'v-punjab' || v.parentId === 'v-punjab';
    return v.id === 'v-amritsar';
  });

  const scopedVehicles = VEHICLES.filter((veh) => {
    if (role.id === 'super_vendor') return true;
    if (role.id === 'regional_vendor') return veh.vendorId.startsWith('v-punjab') || veh.vendorId.startsWith('v-haryana') || veh.vendorId === 'v-north' || veh.vendorId === 'v-amritsar';
    if (role.id === 'city_vendor') return veh.vendorId === 'v-punjab' || veh.vendorId === 'v-amritsar';
    return veh.vendorId === 'v-amritsar';
  });

  const scopedDrivers = DRIVERS.filter((drv) => {
    if (role.id === 'super_vendor') return true;
    if (role.id === 'regional_vendor') return drv.vendorId.startsWith('v-punjab') || drv.vendorId.startsWith('v-haryana') || drv.vendorId === 'v-north' || drv.vendorId === 'v-amritsar';
    if (role.id === 'city_vendor') return drv.vendorId === 'v-punjab' || drv.vendorId === 'v-amritsar';
    return drv.vendorId === 'v-amritsar';
  });

  const expiringDocs = COMPLIANCE_DOCS.filter(
    (d) => d.status === 'Expiring Soon' || d.status === 'Expired'
  );

  const kpis = [
    {
      label: 'Visible Sub-Vendors',
      value: scopedVendors.length,
      unit: 'entities',
      change: '+1 this month',
      icon: Building2,
      visible: can('vendors') !== 'hidden',
    },
    {
      label: 'Fleet In Scope',
      value: scopedVehicles.length,
      unit: 'vehicles',
      change: '88% active utilization',
      icon: Car,
      visible: true,
    },
    {
      label: 'Active Drivers',
      value: scopedDrivers.length,
      unit: 'rostered',
      change: '98% verified KYC',
      icon: Users,
      visible: true,
    },
    {
      label: 'Compliance Health',
      value: `${DASHBOARD_KPIS.complianceRate}%`,
      unit: 'current rate',
      change: 'Audit passing',
      icon: ShieldCheck,
      visible: true,
    },
  ].filter((k) => k.visible);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              {role.vendorName}
            </h1>
            <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              {role.badge}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Operating Territory: <span className="font-medium text-foreground">{role.vendorScope}</span> · Role: {role.title}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/dashboard/compliance"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-border bg-card hover:bg-muted/50 transition-colors text-foreground"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            Audit Ledger
          </Link>
          <Link
            to="/dashboard/fleet"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:opacity-95 transition-opacity"
          >
            <Car className="h-3.5 w-3.5" />
            Manage Fleet
          </Link>
        </div>
      </div>

      {/* Compliance Critical Notice if any expired */}
      {expiringDocs.some((d) => d.status === 'Expired') && (
        <div className="p-4 rounded-xl border border-destructive/30 bg-destructive/5 flex items-start sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/10 text-destructive flex-shrink-0 mt-0.5 sm:mt-0">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-destructive">
                Compliance Hold Alert: Immediate Action Required
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                1 or more vehicles have expired regulatory permits or insurance. Dispatches have been automatically paused.
              </p>
            </div>
          </div>
          <Link
            to="/dashboard/compliance"
            className="flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-md bg-destructive text-white hover:opacity-90 transition-opacity"
          >
            Review Docs
          </Link>
        </div>
      )}

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-xl border border-border/70 bg-card shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-muted-foreground mb-3">
                <span className="text-xs font-medium">{kpi.label}</span>
                <div className="p-1.5 rounded-md bg-muted/60 text-foreground/80">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold tracking-tight text-foreground">
                    {kpi.value}
                  </span>
                  <span className="text-[11px] text-muted-foreground">{kpi.unit}</span>
                </div>
                <div className="mt-1 flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="h-3 w-3" />
                  <span>{kpi.change}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Activity Feed & Quick Actions / Scoped Hierarchy */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): Recent Operational Activity */}
        <div className="lg:col-span-2 rounded-xl border border-border/70 bg-card p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-border/50 pb-3">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Audit & Operational Stream</h2>
              <p className="text-xs text-muted-foreground">Immutable real-time events logged across your tier</p>
            </div>
            <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" /> Live
            </span>
          </div>

          <div className="divide-y divide-border/40">
            {ACTIVITY_FEED.map((event) => (
              <div key={event.id} className="py-3.5 flex items-start justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <p className="font-medium text-foreground">{event.message}</p>
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span className="font-semibold text-foreground/80">{event.actor}</span>
                    <span>·</span>
                    <span>{event.vendorName}</span>
                  </div>
                </div>
                <span className="text-[10px] text-muted-foreground/80 font-mono whitespace-nowrap">
                  {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Quick Status & Scoped Hierarchy mini map */}
        <div className="space-y-6">
          {/* Quick Compliance Summary */}
          <div className="rounded-xl border border-border/70 bg-card p-5 space-y-4">
            <h2 className="text-sm font-semibold text-foreground">Compliance Document Health</h2>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Fully Valid Documents</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">92%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-muted overflow-hidden flex">
                <div className="bg-emerald-500 h-full w-[92%]" />
                <div className="bg-amber-500 h-full w-[6%]" />
                <div className="bg-destructive h-full w-[2%]" />
              </div>
              <div className="pt-2 grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded bg-muted/40 border border-border/40">
                  <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">420</div>
                  <div className="text-[10px] text-muted-foreground">Active</div>
                </div>
                <div className="p-2 rounded bg-muted/40 border border-border/40">
                  <div className="text-xs font-bold text-amber-600 dark:text-amber-400">{DASHBOARD_KPIS.expiringSoon}</div>
                  <div className="text-[10px] text-muted-foreground">Expiring</div>
                </div>
                <div className="p-2 rounded bg-muted/40 border border-border/40">
                  <div className="text-xs font-bold text-destructive">{DASHBOARD_KPIS.expired}</div>
                  <div className="text-[10px] text-muted-foreground">Expired</div>
                </div>
              </div>
            </div>
          </div>

          {/* Scoped Tier info card */}
          <div className="rounded-xl border border-border/70 bg-card p-5 space-y-3">
            <h2 className="text-sm font-semibold text-foreground">Tier Delegation Status</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Your tier <span className="font-medium text-foreground">({role.badge})</span> enforces automated rules: vehicles cannot be assigned without active permits, and drivers are uniquely bound to single vehicles.
            </p>
            <div className="pt-2">
              <Link
                to="/dashboard/permissions"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-muted/50 transition-colors"
              >
                <span>View Permission Delegation</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;
