import { HOW_IT_WORKS_STEPS } from '@/data/landingData';

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 border-y border-border bg-muted/30 dark:bg-muted/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Header — left-aligned */}
        <div className="space-y-3 max-w-xl">
          <p className="section-label">Operational Lifecycle</p>
          <h2 className="text-3xl sm:text-4xl text-foreground">
            From onboarding to operations.
          </h2>
          <p className="text-sm leading-7 text-muted-foreground">
            Five steps that turn fragmented contractor fleets into a structured, compliant transport network.
          </p>
        </div>

        {/* Steps — table-like horizontal list on desktop, vertical on mobile */}
        <div className="relative">

          {/* Connecting line — desktop only */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[1.6rem] left-6 right-6 h-px bg-border"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-border rounded-lg overflow-hidden lg:gap-0">
            {HOW_IT_WORKS_STEPS.map((step, idx) => (
              <div
                key={step.stepNumber}
                className="bg-card p-5 space-y-3 relative group hover:bg-muted/40 transition-colors duration-100"
              >
                {/* Step number */}
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs font-mono font-semibold text-primary tabular-nums"
                    aria-label={`Step ${idx + 1}`}
                  >
                    {step.stepNumber}
                  </span>
                  {/* Connector dot */}
                  <div
                    aria-hidden="true"
                    className="h-2 w-2 rounded-full border-2 border-primary bg-background relative z-10"
                  />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-sm font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-5">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
