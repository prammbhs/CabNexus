import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/common/Button';

interface FinalCTAProps {
  onOpenDashboard?: () => void;
  onExploreFeatures?: () => void;
}

export function FinalCTA({ onOpenDashboard, onExploreFeatures }: FinalCTAProps) {
  return (
    <section className="py-20 sm:py-32 border-t border-border bg-foreground dark:bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Two-column: heading left, actions right */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">

          {/* Left: Headline — bg is always dark so use white explicitly */}
          <div className="space-y-4 max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40 dark:text-muted-foreground">
              Ready when you are
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.12] text-white dark:text-foreground">
              Take control of your fleet operations.
            </h2>
            <p className="text-sm leading-7 text-white/55 dark:text-muted-foreground">
              Manage vendors. Onboard drivers. Track compliance.<br className="hidden sm:block" />
              Run your fleet from one platform.
            </p>

            {/* Proof points */}
            <ul className="flex flex-col gap-1.5 pt-2" aria-label="Key capabilities">
              {[
                'Full N-Tier Vendor Hierarchy',
                'Granular Role-Based Permissions',
                'Automated Compliance Tracking',
              ].map((point) => (
                <li key={point} className="flex items-center gap-2.5 text-sm text-white/55 dark:text-muted-foreground">
                  <span className="h-px w-4 bg-primary inline-block flex-shrink-0" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Actions */}
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 flex-shrink-0">
            <Button
              size="lg"
              onClick={onOpenDashboard}
              className="text-sm font-medium bg-primary hover:bg-primary/90 text-primary-foreground px-7 h-11 group"
            >
              Open CabNexus Dashboard
              <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-150 group-hover:translate-x-0.5" />
            </Button>

            {/* Outline button on dark bg — explicit white border + text */}
            <button
              type="button"
              onClick={onExploreFeatures}
              className="text-sm font-medium px-6 h-11 rounded-md border border-white/25 dark:border-border text-white dark:text-foreground hover:bg-white/10 dark:hover:bg-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Explore Features
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
