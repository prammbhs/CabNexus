import { ShieldCheck, Heart, GitBranch, CircleHelp, FileText } from 'lucide-react';
import { Badge } from '@/components/common/Badge';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-card/40 text-muted-foreground transition-colors mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-emerald-500 text-white font-bold text-sm shadow-xs">
                CN
              </div>
              <span className="text-base font-bold tracking-tight text-foreground">
                CabNexus
              </span>
            </div>
            <p className="text-xs leading-relaxed max-w-sm">
              Enterprise vendor cab and driver onboarding system. Streamlining multi-level vendor hierarchy, delegated compliance workflows, and real-time fleet operations.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <Badge variant="success" className="text-[11px] gap-1.5 py-0.5 px-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                All Systems Operational
              </Badge>
            </div>
          </div>

          {/* Column 1: Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-foreground tracking-wider uppercase">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hierarchy" className="hover:text-foreground transition-colors">Vendor Hierarchy</a>
              </li>
              <li>
                <a href="#cabs" className="hover:text-foreground transition-colors">Cab Onboarding</a>
              </li>
              <li>
                <a href="#drivers" className="hover:text-foreground transition-colors">Driver Allocation</a>
              </li>
              <li>
                <a href="#compliance" className="hover:text-foreground transition-colors">30-Day Expiry Engine</a>
              </li>
            </ul>
          </div>

          {/* Column 2: Governance & Security */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-foreground tracking-wider uppercase">
              Compliance
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#rules" className="hover:text-foreground transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                  Audit Trail
                </a>
              </li>
              <li>
                <a href="#verification" className="hover:text-foreground transition-colors">Document Verification</a>
              </li>
              <li>
                <a href="#duplicate-guard" className="hover:text-foreground transition-colors">Duplicate Guard</a>
              </li>
              <li>
                <a href="#delegation" className="hover:text-foreground transition-colors">Delegated Authority</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-foreground tracking-wider uppercase">
              Resources
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#docs" className="hover:text-foreground transition-colors flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" />
                  API Documentation
                </a>
              </li>
              <li>
                <a href="#support" className="hover:text-foreground transition-colors flex items-center gap-1.5">
                  <CircleHelp className="h-3.5 w-3.5" />
                  Support Desk
                </a>
              </li>
              <li>
                <a href="#github" className="hover:text-foreground transition-colors flex items-center gap-1.5">
                  <GitBranch className="h-3.5 w-3.5" />
                  Source Repository
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal / Copyright Bar */}
        <div className="mt-10 pt-6 border-t border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="flex items-center gap-1">
            CabNexus &copy; {currentYear}. Engineered for high-scale multi-tier transport networks.
          </p>
          <div className="flex items-center gap-4">
            <a href="#privacy" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" className="hover:text-foreground transition-colors">Terms of Service</a>
            <span>•</span>
            <span className="inline-flex items-center gap-1 text-muted-foreground">
              Built with <Heart className="h-3 w-3 text-red-500 fill-red-500 inline" /> for Operations
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
