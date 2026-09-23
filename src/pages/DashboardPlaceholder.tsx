import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Car, 
  Users, 
  ShieldCheck, 
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/common/Card';

export function DashboardPlaceholder() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top Banner */}
      <header className="border-b border-border/80 bg-card/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground p-1.5 rounded-lg hover:bg-muted transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Landing</span>
          </button>
          <span className="text-muted-foreground/40">|</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-foreground">◈ CabNexus Operations Portal</span>
            <Badge variant="outline" className="text-[10px]">Phase 2 Demo Route</Badge>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate('/login')}
            className="text-xs"
          >
            Switch Role
          </Button>
        </div>
      </header>

      {/* Main Content Preview */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Welcome Banner */}
        <div className="rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 via-card to-background p-6 sm:p-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-semibold">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Operational Application Shell</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            CabNexus Operations Dashboard
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
            You have traversed from the landing page CTA into the product routing space (<code className="text-primary font-mono text-xs">/dashboard</code>). Subsequent phases implement reactive domain services, RBAC switches, and full vehicle onboarding forms.
          </p>
        </div>

        {/* Next Phase Roadmap Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="border-border/70 hover:border-primary/40 transition-all">
            <CardHeader className="pb-3">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-2">
                <Building2 className="h-5 w-5" />
              </div>
              <CardTitle className="text-base">Vendor Hierarchy</CardTitle>
              <CardDescription className="text-xs">
                Phase 5: Arbitrary depth tree explorer with recursive delegation.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Badge variant="secondary" className="text-[10px]">Upcoming Phase</Badge>
            </CardContent>
          </Card>

          <Card className="border-border/70 hover:border-primary/40 transition-all">
            <CardHeader className="pb-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-2">
                <Car className="h-5 w-5" />
              </div>
              <CardTitle className="text-base">Fleet Onboarding</CardTitle>
              <CardDescription className="text-xs">
                Phase 7: Plate validation, fuel classification, and RC status tracking.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Badge variant="secondary" className="text-[10px]">Upcoming Phase</Badge>
            </CardContent>
          </Card>

          <Card className="border-border/70 hover:border-primary/40 transition-all">
            <CardHeader className="pb-3">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-2">
                <Users className="h-5 w-5" />
              </div>
              <CardTitle className="text-base">Driver KYC &amp; Binding</CardTitle>
              <CardDescription className="text-xs">
                Phase 8: Conflict-free vehicle assignment with document checks.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Badge variant="secondary" className="text-[10px]">Upcoming Phase</Badge>
            </CardContent>
          </Card>

          <Card className="border-border/70 hover:border-primary/40 transition-all">
            <CardHeader className="pb-3">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-2">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <CardTitle className="text-base">Compliance Engine</CardTitle>
              <CardDescription className="text-xs">
                Phase 9: Real-time 30-day window rule with automatic operational holds.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Badge variant="secondary" className="text-[10px]">Upcoming Phase</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Back CTA */}
        <div className="pt-4 flex justify-start">
          <Button onClick={() => navigate('/')} className="text-xs font-bold">
            <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
            <span>Return to Landing Page</span>
          </Button>
        </div>

      </main>
    </div>
  );
}

export default DashboardPlaceholder;
