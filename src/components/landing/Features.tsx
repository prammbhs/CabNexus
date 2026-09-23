import {
  GitBranch,
  Car,
  Users,
  ShieldCheck,
  FileCheck,
  LayoutDashboard,
} from 'lucide-react';
import { FEATURES } from '@/data/landingData';

interface FeaturesProps {
  onSelectFeature?: (featureId: string) => void;
}

const iconComponents: Record<string, React.ComponentType<{ className?: string }>> = {
  GitBranch,
  Car,
  Users,
  ShieldCheck,
  FileCheck,
  LayoutDashboard,
};

// Color accents per feature — intentionally varied, not all the same
const featureAccents: Record<string, { icon: string; label: string }> = {
  'vendor-hierarchy':    { icon: 'text-violet-500', label: 'bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300' },
  'fleet-management':    { icon: 'text-emerald-500', label: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300' },
  'driver-management':   { icon: 'text-blue-500', label: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' },
  'permission-management': { icon: 'text-amber-500', label: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300' },
  'compliance-tracking': { icon: 'text-rose-500', label: 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300' },
  'centralized-control': { icon: 'text-indigo-500', label: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300' },
};

export function Features({ onSelectFeature }: FeaturesProps) {
  const [firstTwo, rest] = [FEATURES.slice(0, 2), FEATURES.slice(2)];

  return (
    <section id="features" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Header — left-aligned, not centered */}
        <div className="space-y-3 max-w-2xl">
          <p className="section-label">Platform Capabilities</p>
          <h2 className="text-3xl sm:text-4xl text-foreground">
            Everything your fleet network needs.
          </h2>
          <p className="text-sm leading-7 text-muted-foreground">
            Purpose-built for ride-hailing networks, multi-city logistics, and vendor fleet consortia.
          </p>
        </div>

        {/* Featured pair — wider cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {firstTwo.map((feature) => {
            const Icon = iconComponents[feature.iconName] ?? LayoutDashboard;
            const accent = featureAccents[feature.id] ?? { icon: 'text-primary', label: 'bg-primary/5 text-primary' };
            return (
              <div
                key={feature.id}
                className="group rounded-lg border border-border bg-card p-6 shadow-card hover:shadow-card-hover hover:border-border/80 transition-all duration-150 cursor-default"
                onClick={() => onSelectFeature?.(feature.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') onSelectFeature?.(feature.id); }}
                aria-label={`${feature.title} — ${feature.description}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="h-10 w-10 rounded-lg border border-border bg-muted flex items-center justify-center flex-shrink-0">
                    <Icon className={`h-5 w-5 ${accent.icon}`} />
                  </div>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${accent.label} flex-shrink-0`}>
                    {feature.badge}
                  </span>
                </div>

                <div className="mt-4 space-y-1.5">
                  <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-100">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-6">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Supporting 4 — compact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rest.map((feature) => {
            const Icon = iconComponents[feature.iconName] ?? LayoutDashboard;
            const accent = featureAccents[feature.id] ?? { icon: 'text-primary', label: 'bg-primary/5 text-primary' };
            return (
              <div
                key={feature.id}
                className="group rounded-lg border border-border bg-card p-5 shadow-card hover:shadow-card-hover hover:border-border/80 transition-all duration-150 space-y-3 cursor-default"
                onClick={() => onSelectFeature?.(feature.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') onSelectFeature?.(feature.id); }}
                aria-label={`${feature.title} — ${feature.description}`}
              >
                <div className="flex items-center justify-between">
                  <div className="h-8 w-8 rounded-md border border-border bg-muted flex items-center justify-center">
                    <Icon className={`h-4 w-4 ${accent.icon}`} />
                  </div>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${accent.label}`}>
                    {feature.badge}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-100">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-5 mt-1">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
