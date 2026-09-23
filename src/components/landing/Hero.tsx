import { 
  ArrowRight, 
  Building2, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { CAPABILITY_PILLS, HERO_STATS } from '@/data/landingData';

interface HeroProps {
  onOpenDashboard?: () => void;
  onExploreFeatures?: () => void;
}

export function Hero({ onOpenDashboard, onExploreFeatures }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background ambient decorative glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-x-0 -top-20 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
      >
        <div 
          className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-indigo-500/20 via-primary/20 to-emerald-500/20 opacity-40 dark:opacity-30"
          style={{
            clipPath: 'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)'
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
          
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wide shadow-xs animate-in fade-in duration-300">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Next-Gen Enterprise Fleet Infrastructure</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground text-balance leading-[1.15]">
            One Platform for Every{' '}
            <span className="bg-gradient-to-r from-indigo-500 via-primary to-emerald-500 bg-clip-text text-transparent">
              Fleet, Vendor &amp; Driver.
            </span>
          </h1>

          {/* Supporting text */}
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl text-balance leading-relaxed">
            Manage multi-level vendor networks, onboard vehicles and drivers, control permissions, and keep your entire fleet compliant from one centralized platform.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 w-full sm:w-auto">
            <Button
              size="lg"
              onClick={onOpenDashboard}
              className="w-full sm:w-auto text-sm font-bold shadow-lg shadow-primary/25 bg-primary hover:bg-primary/90 text-primary-foreground group px-6 py-6"
            >
              <span>Open Dashboard</span>
              <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={onExploreFeatures}
              className="w-full sm:w-auto text-sm font-semibold border-border hover:bg-muted/80 px-6 py-6"
            >
              Explore Features
            </Button>
          </div>

          {/* Capability Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            {CAPABILITY_PILLS.map((pill) => (
              <span
                key={pill}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium bg-muted/60 text-muted-foreground border border-border/70"
              >
                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                {pill}
              </span>
            ))}
          </div>
        </div>

        {/* Hero Product Preview Visual */}
        <div className="mt-12 sm:mt-16 relative">
          <div className="relative mx-auto max-w-5xl rounded-2xl border border-border/80 bg-card/90 backdrop-blur-xl shadow-2xl p-3 sm:p-5 transition-all">
            
            {/* Window control dots bar */}
            <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-4 px-1">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-[11px] font-mono text-muted-foreground">cabnexus.app/ops/dashboard</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Live Fleet Sync
                </span>
              </div>
            </div>

            {/* Dashboard Mock Content */}
            <div className="space-y-4">
              {/* Stat metric cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {HERO_STATS.map((stat, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-muted/30 border border-border/60 space-y-1">
                    <span className="text-xs text-muted-foreground font-medium">{stat.label}</span>
                    <div className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">{stat.value}</div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-500">
                      <TrendingUp className="h-3 w-3" /> Real-time active
                    </span>
                  </div>
                ))}
              </div>

              {/* Split operational preview: Hierarchy & Alerts */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                
                {/* Left: Vendor Hierarchy Snippet */}
                <div className="md:col-span-7 rounded-xl bg-muted/20 border border-border/60 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5 text-primary" /> Vendor Hierarchy Topology
                    </span>
                    <Badge variant="outline" className="text-[10px]">Root: Super Vendor</Badge>
                  </div>
                  
                  <div className="space-y-2 font-mono text-xs text-muted-foreground bg-background/60 p-3 rounded-lg border border-border/40">
                    <div className="text-foreground font-semibold flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      Super Vendor India Operations (Root)
                    </div>
                    <div className="pl-4 border-l border-border/80 space-y-1.5 pt-1">
                      <div className="text-foreground/90 font-medium">├── North Region Operations</div>
                      <div className="pl-4 border-l border-border/80 space-y-1">
                        <div>├── Punjab State Fleet <span className="text-emerald-500">(248 Cabs)</span></div>
                        <div>└── Haryana Transit <span className="text-emerald-500">(242 Cabs)</span></div>
                      </div>
                      <div className="text-foreground/90 font-medium pt-1">└── South Region Operations <span className="text-muted-foreground/70">(360 Cabs)</span></div>
                    </div>
                  </div>
                </div>

                {/* Right: Compliance Alert Stream */}
                <div className="md:col-span-5 rounded-xl bg-muted/20 border border-border/60 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Compliance Triage
                    </span>
                    <span className="text-[10px] text-muted-foreground">30-Day Window</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
                        <div>
                          <div className="font-semibold text-amber-700 dark:text-amber-300">34 Expiring Soon</div>
                          <div className="text-[10px] text-muted-foreground">Insurance &amp; Permits &lt; 30d</div>
                        </div>
                      </div>
                      <Badge variant="warning" className="text-[10px]">Action Needed</Badge>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-rose-500 shrink-0" />
                        <div>
                          <div className="font-semibold text-rose-700 dark:text-rose-300">12 Documents Expired</div>
                          <div className="text-[10px] text-muted-foreground">Cabs Placed on Hold</div>
                        </div>
                      </div>
                      <Badge variant="destructive" className="text-[10px]">Compliance Hold</Badge>
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
