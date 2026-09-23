import { Badge } from '@/components/common/Badge';
import { HOW_IT_WORKS_STEPS } from '@/data/landingData';

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 border-y border-border/60 bg-muted/10 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="outline" className="text-xs font-semibold px-2.5 py-0.5">
            Operational Lifecycle
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground">
            From onboarding to operations.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Five sequential milestones that turn fragmented contractor fleets into a structured, compliant, high-output transport network.
          </p>
        </div>

        {/* Steps: Horizontal on Desktop, Vertical on Mobile */}
        <div className="mt-14 relative">
          
          {/* Desktop connecting track line */}
          <div 
            aria-hidden="true" 
            className="hidden lg:block absolute top-7 left-12 right-12 h-0.5 bg-border/80 -z-0" 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {HOW_IT_WORKS_STEPS.map((step, idx) => (
              <div 
                key={step.stepNumber} 
                className="rounded-2xl border border-border/80 bg-card p-5 shadow-xs hover:border-primary/50 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary font-mono font-black text-sm flex items-center justify-center border border-primary/20 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">
                      {step.stepNumber}
                    </div>
                    {idx < HOW_IT_WORKS_STEPS.length - 1 && (
                      <span className="lg:hidden text-muted-foreground/60 text-xs font-mono">
                        Next &rarr;
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-foreground">
                    {step.title}
                  </h3>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-2 text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                  Phase Milestone {step.stepNumber}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
