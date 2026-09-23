interface FooterProps {
  onOpenDashboard?: () => void;
  onSignIn?: () => void;
}

export function Footer({ onOpenDashboard, onSignIn }: FooterProps) {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border/80 bg-card/60 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 via-primary to-emerald-500 text-white font-bold text-sm">
                ◈
              </div>
              <span className="text-lg font-black tracking-tight text-foreground">
                CabNexus
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-sm leading-relaxed">
              Vendor, Fleet, Driver &amp; Compliance Management Platform for multi-city ride-hailing and transport organizations.
            </p>
            <div className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-muted/60 text-muted-foreground border border-border">
              Built with React + TypeScript
            </div>
          </div>

          {/* Product Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Product
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <button 
                  type="button" 
                  onClick={() => scrollTo('#features')} 
                  className="hover:text-foreground transition-colors"
                >
                  Features
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={onOpenDashboard} 
                  className="hover:text-foreground transition-colors font-medium text-primary"
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => scrollTo('#compliance')} 
                  className="hover:text-foreground transition-colors"
                >
                  Compliance Center
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => scrollTo('#hierarchy')} 
                  className="hover:text-foreground transition-colors"
                >
                  Vendor Hierarchy
                </button>
              </li>
            </ul>
          </div>

          {/* Developer / Demo Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Developer &amp; Evaluation
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-foreground transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={onSignIn} 
                  className="hover:text-foreground transition-colors"
                >
                  Demo Role Switcher
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={onOpenDashboard} 
                  className="hover:text-foreground transition-colors"
                >
                  Interactive Walkthrough
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>
            &copy; 2026 CabNexus Platform. Frontend Technical Evaluation.
          </div>
          <div className="flex items-center gap-4">
            <span>No external dependencies required</span>
            <span>•</span>
            <span>Pure client-side simulation</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
