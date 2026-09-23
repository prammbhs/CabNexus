import { ArrowRight, AlertCircle, Building2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { HERO_STATS } from '@/data/landingData';

interface HeroProps {
  onOpenDashboard?: () => void;
  onExploreFeatures?: () => void;
}

export function Hero({ onOpenDashboard, onExploreFeatures }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Copy */}
          <div className="space-y-7">
            {/* Section label — no pulsing pill badge */}
            <p className="section-label">
              Fleet &amp; Vendor Management Platform
            </p>

            {/* Headline — plain weight, no gradient fill */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] leading-[1.12] text-foreground">
              One Platform for Every{' '}
              <span className="text-primary">Fleet,</span>{' '}
              <span className="text-foreground">Vendor</span>{' '}
              <span className="text-muted-foreground font-semibold">&amp; Driver.</span>
            </h1>

            <p className="text-base text-muted-foreground leading-7 max-w-lg">
              Manage multi-level vendor networks, onboard vehicles and drivers, control permissions, and keep your entire fleet compliant — from one centralized platform.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start gap-3">
              <Button
                size="lg"
                onClick={onOpenDashboard}
                className="w-full sm:w-auto text-sm font-medium bg-primary hover:bg-primary/90 text-primary-foreground px-6 h-11 group"
              >
                Open Dashboard
                <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-150 group-hover:translate-x-0.5" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={onExploreFeatures}
                className="w-full sm:w-auto text-sm font-medium border-border hover:bg-accent px-6 h-11"
              >
                Explore Features
              </Button>
            </div>

            {/* Capability list — plain, not pill tags */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1">
              {[
                'N-Level Vendor Hierarchy',
                'Role-Based Access',
                'Fleet Compliance',
                'Centralized Ops',
              ].map((cap) => (
                <span key={cap} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="h-px w-3 bg-primary inline-block" aria-hidden="true" />
                  {cap}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Dashboard preview — real app chrome, no macOS dots */}
          <div className="relative lg:mt-0 mt-4">
            {/* Subtle radial highlight behind the card */}
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-2xl bg-primary/5 dark:bg-primary/[0.04] -z-10"
            />

            <div className="rounded-xl border border-border bg-card shadow-panel overflow-hidden">
              {/* App chrome — toolbar, not macOS dots */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-surface-subtle dark:bg-muted">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded bg-primary/10 flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <rect x="0.5" y="0.5" width="4" height="4" rx="0.75" fill="hsl(var(--primary))" fillOpacity="0.8" />
                      <rect x="5.5" y="0.5" width="4" height="4" rx="0.75" fill="hsl(var(--primary))" fillOpacity="0.4" />
                      <rect x="0.5" y="5.5" width="4" height="4" rx="0.75" fill="hsl(var(--primary))" fillOpacity="0.4" />
                      <rect x="5.5" y="5.5" width="4" height="4" rx="0.75" fill="hsl(var(--primary))" fillOpacity="0.8" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-foreground">Fleet Overview</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                  <span className="status-dot-active" />
                  <span>Live</span>
                </div>
              </div>

              <div className="p-4 space-y-4">
                {/* Stat metric row */}
                <div className="grid grid-cols-4 gap-3">
                  {HERO_STATS.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-lg border border-border bg-background p-3 space-y-0.5"
                    >
                      <p className="text-[10px] font-medium text-muted-foreground truncate">{stat.label}</p>
                      <p className="text-xl font-bold text-foreground tabular-nums">{stat.value}</p>
                    </div>
                  ))}
                </div>

                {/* Split: Hierarchy tree + Compliance alerts */}
                <div className="grid grid-cols-5 gap-3">

                  {/* Vendor hierarchy panel */}
                  <div className="col-span-3 rounded-lg border border-border bg-background p-3 space-y-2.5">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                      <span className="text-[11px] font-semibold text-foreground">Vendor Hierarchy</span>
                    </div>
                    <div className="font-mono text-[11px] leading-5 space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-sm bg-primary inline-block flex-shrink-0" />
                        <span className="font-medium text-foreground truncate">Super Vendor India</span>
                      </div>
                      <div className="pl-4 border-l-2 border-border ml-1 space-y-0.5">
                        <div className="text-foreground/80">├── North Region</div>
                        <div className="pl-4 border-l-2 border-border ml-1 space-y-0.5">
                          <div className="text-muted-foreground">├── Punjab Fleet
                            <span className="text-emerald-600 dark:text-emerald-400"> ·248</span>
                          </div>
                          <div className="text-muted-foreground">└── Haryana Transit
                            <span className="text-emerald-600 dark:text-emerald-400"> ·242</span>
                          </div>
                        </div>
                        <div className="text-foreground/80">└── South Region</div>
                      </div>
                    </div>
                  </div>

                  {/* Compliance alerts panel */}
                  <div className="col-span-2 rounded-lg border border-border bg-background p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                      <span className="text-[11px] font-semibold text-foreground">Compliance</span>
                    </div>
                    <div className="space-y-2">
                      <div className="rounded border border-amber-200 dark:border-amber-800/60 bg-amber-50 dark:bg-amber-900/20 p-2">
                        <div className="flex items-start gap-1.5">
                          <AlertCircle className="h-3 w-3 text-amber-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-[10px] font-semibold text-amber-700 dark:text-amber-300">34 Expiring</p>
                            <p className="text-[10px] text-muted-foreground">Insurance &lt;30d</p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded border border-rose-200 dark:border-rose-800/60 bg-rose-50 dark:bg-rose-900/20 p-2">
                        <div className="flex items-start gap-1.5">
                          <AlertCircle className="h-3 w-3 text-rose-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-[10px] font-semibold text-rose-700 dark:text-rose-300">12 Expired</p>
                            <p className="text-[10px] text-muted-foreground">Cabs on hold</p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-900/20 p-2">
                        <p className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">912 Valid</p>
                        <p className="text-[10px] text-muted-foreground">96% compliant</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
