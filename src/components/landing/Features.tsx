import { 
  GitBranch, 
  Car, 
  Users, 
  ShieldCheck, 
  FileCheck, 
  LayoutDashboard,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { FEATURES } from '@/data/landingData';
import { Badge } from '@/components/common/Badge';

interface FeaturesProps {
  onSelectFeature?: (featureId: string) => void;
}

export function Features({ onSelectFeature }: FeaturesProps) {
  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'GitBranch': return <GitBranch className="h-5 w-5 text-indigo-500" />;
      case 'Car': return <Car className="h-5 w-5 text-emerald-500" />;
      case 'Users': return <Users className="h-5 w-5 text-purple-500" />;
      case 'ShieldCheck': return <ShieldCheck className="h-5 w-5 text-blue-500" />;
      case 'FileCheck': return <FileCheck className="h-5 w-5 text-amber-500" />;
      case 'LayoutDashboard': return <LayoutDashboard className="h-5 w-5 text-rose-500" />;
      default: return <CheckCircle2 className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <section id="features" className="py-16 sm:py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 max-w-3xl">
          <div className="space-y-3">
            <Badge variant="outline" className="text-xs font-semibold px-2.5 py-0.5">
              Comprehensive Platform Capabilities
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground">
              Everything your fleet network needs.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Purpose-built for ride-hailing networks, multi-city logistics, and vendor fleet consortia.
            </p>
          </div>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <div
              key={feature.id}
              className="group rounded-2xl border border-border/80 bg-card p-6 shadow-xs hover:border-primary/50 hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-xl bg-muted/80 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                    {getFeatureIcon(feature.iconName)}
                  </div>
                  <Badge variant="secondary" className="text-[11px] font-semibold">
                    {feature.badge}
                  </Badge>
                </div>

                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] text-muted-foreground">
                  Benchmark: <strong className="text-foreground">{feature.metric}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => onSelectFeature?.(feature.id)}
                  className="text-xs font-semibold text-primary inline-flex items-center gap-1 hover:underline"
                >
                  <span>Explore</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
