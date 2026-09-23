import { 
  Building2, 
  Car, 
  AlertTriangle, 
  EyeOff, 
  ArrowDown, 
  CheckCircle2 
} from 'lucide-react';
import { PROBLEM_CARDS } from '@/data/landingData';

export function ProblemSolution() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2': return <Building2 className="h-5 w-5 text-rose-500" />;
      case 'Car': return <Car className="h-5 w-5 text-rose-500" />;
      case 'AlertTriangle': return <AlertTriangle className="h-5 w-5 text-rose-500" />;
      case 'EyeOff': return <EyeOff className="h-5 w-5 text-rose-500" />;
      default: return <AlertTriangle className="h-5 w-5 text-rose-500" />;
    }
  };

  return (
    <section className="py-16 sm:py-20 border-y border-border/60 bg-muted/20 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-wider uppercase text-rose-500 dark:text-rose-400">
            The Scaling Bottleneck
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground">
            Fleet operations become difficult at scale.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            As taxi and ride-sharing operations expand across cities, manual spreadsheets and scattered oversight expose networks to severe operational risk.
          </p>
        </div>

        {/* 4 Problem Cards Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {PROBLEM_CARDS.map((card) => (
            <div
              key={card.id}
              className="rounded-2xl border border-border/70 bg-card p-6 shadow-xs hover:border-rose-500/40 hover:shadow-md transition-all space-y-3 relative group"
            >
              <div className="h-10 w-10 rounded-xl bg-rose-500/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                {getIcon(card.iconName)}
              </div>
              <h3 className="text-base font-bold text-foreground">{card.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Visual bridge to Solution */}
        <div className="mt-14 sm:mt-16 flex flex-col items-center text-center space-y-3 max-w-2xl mx-auto">
          <div className="h-10 w-10 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/30 animate-bounce">
            <ArrowDown className="h-5 w-5" />
          </div>
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 w-full shadow-xs">
            <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm sm:text-base">
              <CheckCircle2 className="h-5 w-5 shrink-0" />
              <span>CabNexus brings everything together in one platform.</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Unified hierarchy, scoped permissions, real-time KYC, and automated compliance holds in a single workspace.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
