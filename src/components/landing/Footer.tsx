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
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">

          {/* Brand */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-primary flex items-center justify-center flex-shrink-0">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <rect x="0.5" y="0.5" width="4" height="4" rx="0.75" fill="white" fillOpacity="0.9" />
                  <rect x="5.5" y="0.5" width="4" height="4" rx="0.75" fill="white" fillOpacity="0.5" />
                  <rect x="0.5" y="5.5" width="4" height="4" rx="0.75" fill="white" fillOpacity="0.5" />
                  <rect x="5.5" y="5.5" width="4" height="4" rx="0.75" fill="white" fillOpacity="0.9" />
                </svg>
              </div>
              <span className="text-[15px] font-semibold text-foreground tracking-[-0.01em]">
                CabNexus
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-6 max-w-xs">
              Vendor, Fleet, Driver &amp; Compliance Management Platform for multi-city ride-hailing organizations.
            </p>
            <span className="inline-flex items-center text-xs font-mono text-muted-foreground">
              Built with React + TypeScript
            </span>
          </div>

          {/* Product links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Product
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Features', action: () => scrollTo('#features') },
                { label: 'Dashboard', action: onOpenDashboard },
                { label: 'Compliance', action: () => scrollTo('#compliance') },
                { label: 'Hierarchy', action: () => scrollTo('#hierarchy') },
              ].map(({ label, action }) => (
                <li key={label}>
                  <button
                    type="button"
                    onClick={action}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:underline"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Developer links */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Developer
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onSignIn}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Documentation
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenDashboard}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Demo
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© 2026 CabNexus</span>
          <span>Frontend Technical Evaluation · React + TypeScript + Vite</span>
        </div>
      </div>
    </footer>
  );
}
