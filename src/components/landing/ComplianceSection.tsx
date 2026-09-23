import { 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  FileText
} from 'lucide-react';
import { Badge } from '@/components/common/Badge';
import { COMPLIANCE_METRICS, SAMPLE_DOCUMENTS } from '@/data/landingData';

export function ComplianceSection() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Valid':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="h-3 w-3" /> Valid
          </span>
        );
      case 'Expiring Soon':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Clock className="h-3 w-3" /> Expiring Soon
          </span>
        );
      case 'Expired':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            <AlertCircle className="h-3 w-3" /> Expired (Hold)
          </span>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <section id="compliance" className="py-16 sm:py-24 border-y border-border/60 bg-muted/10 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="outline" className="text-xs font-semibold px-2.5 py-0.5">
            Automated Fleet Safety &amp; Legal Guardrails
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground">
            Stay ahead of compliance.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Keep track of licenses, insurance, permits, RCs, and other statutory documents from one centralized, automated governance center.
          </p>
        </div>

        {/* Compliance Dashboard Visualization Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Health Rate Card & Metrics */}
          <div className="lg:col-span-4 rounded-2xl border border-border/80 bg-card p-6 shadow-sm space-y-6">
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Fleet Compliance Rate
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black tracking-tight text-foreground">
                  {COMPLIANCE_METRICS.overallScore}
                </span>
                <span className="text-xs font-bold text-emerald-500">Above National Target</span>
              </div>
            </div>

            {/* Progress gauge bar */}
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-primary h-full rounded-full transition-all duration-500" 
                style={{ width: COMPLIANCE_METRICS.overallScore }} 
              />
            </div>

            {/* Metric counters breakdown */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-muted/40 border border-border/50">
                <span className="text-xs text-muted-foreground">Valid Documents</span>
                <div className="text-xl font-extrabold text-foreground">{COMPLIANCE_METRICS.validCount}</div>
                <span className="text-[10px] text-emerald-500 font-semibold">Active dispatch</span>
              </div>

              <div className="p-3 rounded-xl bg-muted/40 border border-border/50">
                <span className="text-xs text-muted-foreground">Expiring (&le;30d)</span>
                <div className="text-xl font-extrabold text-amber-500">{COMPLIANCE_METRICS.expiringSoonCount}</div>
                <span className="text-[10px] text-amber-500 font-semibold">Renewal alerts sent</span>
              </div>

              <div className="p-3 rounded-xl bg-muted/40 border border-border/50">
                <span className="text-xs text-muted-foreground">Expired Documents</span>
                <div className="text-xl font-extrabold text-rose-500">{COMPLIANCE_METRICS.expiredCount}</div>
                <span className="text-[10px] text-rose-500 font-semibold">Automatic holds</span>
              </div>

              <div className="p-3 rounded-xl bg-muted/40 border border-border/50">
                <span className="text-xs text-muted-foreground">Missing Records</span>
                <div className="text-xl font-extrabold text-muted-foreground">{COMPLIANCE_METRICS.missingCount}</div>
                <span className="text-[10px] text-muted-foreground font-semibold">Pending KYC</span>
              </div>
            </div>
          </div>

          {/* Right: Real-time Document Status Stream */}
          <div className="lg:col-span-8 rounded-2xl border border-border/80 bg-card p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-bold text-foreground">Active Document Verification Audit</h3>
              </div>
              <span className="text-xs text-muted-foreground font-mono">Live Sync</span>
            </div>

            <div className="space-y-3">
              {SAMPLE_DOCUMENTS.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-muted/20 border border-border/60 hover:border-border transition-all gap-3 text-xs"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-background flex items-center justify-center border border-border shrink-0 mt-0.5 sm:mt-0">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="font-bold text-foreground text-sm">{doc.name}</div>
                      <div className="text-muted-foreground text-[11px]">{doc.entity}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                    <span className="font-mono text-[11px] text-muted-foreground">
                      Expiry: <strong className="text-foreground">{doc.expiry}</strong>
                    </span>
                    {getStatusBadge(doc.status)}
                  </div>
                </div>
              ))}
            </div>

            {/* Compliance Guarantee Banner */}
            <div className="p-3.5 rounded-xl bg-primary/5 border border-primary/20 flex items-center justify-between text-xs mt-4">
              <span className="text-muted-foreground">
                Automated policy: Cabs with expired documents are instantly quarantined from booking assignment.
              </span>
              <span className="font-bold text-primary shrink-0 hidden sm:inline">
                Zero-Violation Guarantee
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
