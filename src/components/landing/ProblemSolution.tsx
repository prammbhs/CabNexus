import { Building2, Car, AlertTriangle, EyeOff } from 'lucide-react';
import { PROBLEM_CARDS } from '@/data/landingData';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  Car,
  AlertTriangle,
  EyeOff,
};

export function ProblemSolution() {
  return (
    <section className="py-16 sm:py-24 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Two-column layout: left heading, right numbered problems */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left: Section heading */}
          <div className="lg:col-span-4 space-y-4">
            <p className="section-label">The Scaling Problem</p>
            <h2 className="text-3xl sm:text-4xl text-foreground">
              Fleet operations become difficult at scale.
            </h2>
            <p className="text-sm leading-7 text-muted-foreground">
              As ride-sharing operations expand across cities, manual processes expose networks to compounding operational risk.
            </p>

            {/* Solution bridge — no bouncing arrow, no green pill card */}
            <div className="pt-4 border-t border-border">
              <p className="text-sm font-medium text-foreground">
                CabNexus brings everything together.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Unified hierarchy, scoped permissions, automated compliance — in one workspace.
              </p>
            </div>
          </div>

          {/* Right: Numbered editorial list */}
          <div className="lg:col-span-8">
            <ol className="space-y-0 divide-y divide-border" role="list">
              {PROBLEM_CARDS.map((card, idx) => {
                const Icon = iconMap[card.iconName] ?? AlertTriangle;
                return (
                  <li
                    key={card.id}
                    className="flex gap-6 py-6 first:pt-0 last:pb-0 group"
                  >
                    {/* Number */}
                    <div className="flex-shrink-0 pt-0.5">
                      <span className="text-2xl font-bold tabular-nums text-border group-hover:text-primary transition-colors duration-150" aria-hidden="true">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2.5">
                        <div className="h-7 w-7 rounded-md border border-border bg-muted flex items-center justify-center flex-shrink-0">
                          <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                        <h3 className="text-base font-semibold text-foreground">
                          {card.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-6 pl-[2.375rem]">
                        {card.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

        </div>
      </div>
    </section>
  );
}
