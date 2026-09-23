import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/common/Button';

interface FinalCTAProps {
  onOpenDashboard?: () => void;
  onExploreFeatures?: () => void;
}

export function FinalCTA({ onOpenDashboard, onExploreFeatures }: FinalCTAProps) {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl opacity-30"
      >
        <div className="aspect-[1000/400] w-[60rem] bg-gradient-to-t from-primary via-indigo-500 to-emerald-500" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl border border-primary/30 bg-gradient-to-b from-card/90 to-background p-8 sm:p-14 text-center max-w-4xl mx-auto shadow-2xl space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Ready for Production Fleet Operations</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground text-balance">
            Take control of your fleet operations.
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto text-balance leading-relaxed">
            Manage vendors. Onboard drivers. Track compliance. Run your fleet from one centralized, tamper-proof platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Button
              size="lg"
              onClick={onOpenDashboard}
              className="w-full sm:w-auto text-sm font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 px-8 py-6 group"
            >
              <span>Open CabNexus Dashboard</span>
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

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              <span>Full N-Tier Hierarchy</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              <span>Zero Backend Setup Needed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              <span>Instant Role Simulation</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
