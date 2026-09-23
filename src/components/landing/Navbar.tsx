import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/common/Button';

interface NavbarProps {
  onOpenDashboard?: () => void;
  onSignIn?: () => void;
}

export function Navbar({ onOpenDashboard, onSignIn }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Always default to light mode — remove any dark class that may exist
    document.documentElement.classList.remove('dark');
    setIsDark(false);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Hierarchy', href: '#hierarchy' },
    { label: 'Permissions', href: '#permissions' },
    { label: 'Compliance', href: '#compliance' },
    { label: 'How It Works', href: '#how-it-works' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? 'border-b border-border bg-background/95 backdrop-blur-sm shadow-[0_1px_0_0_hsl(var(--border))]'
          : 'bg-background/80 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Wordmark — clean, no gradient icon */}
        <a
          href="#"
          className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          aria-label="CabNexus home"
        >
          {/* Minimal geometric icon */}
          <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <rect x="1" y="1" width="5" height="5" rx="1" fill="white" fillOpacity="0.9" />
              <rect x="8" y="1" width="5" height="5" rx="1" fill="white" fillOpacity="0.6" />
              <rect x="1" y="8" width="5" height="5" rx="1" fill="white" fillOpacity="0.6" />
              <rect x="8" y="8" width="5" height="5" rx="1" fill="white" fillOpacity="0.9" />
            </svg>
          </div>
          <span className="text-[15px] font-semibold text-foreground tracking-[-0.01em]">
            CabNexus
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded transition-colors hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="h-8 w-8 rounded-md border border-border bg-background text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Toggle dark/light mode"
          >
            {isDark
              ? <Sun className="h-3.5 w-3.5 text-amber-400" />
              : <Moon className="h-3.5 w-3.5" />}
          </button>

          <button
            type="button"
            onClick={onSignIn}
            className="h-8 px-3 text-sm text-muted-foreground hover:text-foreground rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Sign In
          </button>

          <Button
            size="sm"
            onClick={onOpenDashboard}
            className="h-8 text-sm font-medium bg-primary hover:bg-primary/90 text-primary-foreground px-3.5 group"
          >
            Open Dashboard
            <ArrowRight className="h-3.5 w-3.5 ml-1.5 transition-transform duration-150 group-hover:translate-x-0.5" />
          </Button>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-1.5 sm:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className="h-8 w-8 rounded-md border border-border bg-background text-muted-foreground flex items-center justify-center transition-colors"
            aria-label="Toggle dark/light mode"
          >
            {isDark
              ? <Sun className="h-3.5 w-3.5 text-amber-400" />
              : <Moon className="h-3.5 w-3.5" />}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="h-8 w-8 rounded-md border border-border bg-background text-foreground flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-border bg-background px-4 py-3 space-y-1 animate-in slide-in-from-top-2 duration-150">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="flex items-center px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-2 border-t border-border flex flex-col gap-2 mt-2">
            <button
              type="button"
              onClick={() => { setMobileMenuOpen(false); onSignIn?.(); }}
              className="w-full h-9 text-sm text-muted-foreground hover:text-foreground border border-border rounded-md transition-colors"
            >
              Sign In
            </button>
            <Button
              onClick={() => { setMobileMenuOpen(false); onOpenDashboard?.(); }}
              className="w-full h-9 text-sm font-medium bg-primary text-primary-foreground justify-center group"
            >
              Open Dashboard
              <ArrowRight className="h-3.5 w-3.5 ml-1.5 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
