import { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/common/Button';

interface NavbarProps {
  onOpenDashboard?: () => void;
  onSignIn?: () => void;
}

export function Navbar({ onOpenDashboard, onSignIn }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Hierarchy', href: '#hierarchy' },
    { label: 'Permissions', href: '#permissions' },
    { label: 'Compliance', href: '#compliance' },
    { label: 'Operations', href: '#operations' },
    { label: 'How It Works', href: '#how-it-works' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? 'border-b border-border/80 bg-background/90 backdrop-blur-xl shadow-xs' 
          : 'border-b border-transparent bg-background/60 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand identity: ◈ CabNexus */}
        <div className="flex items-center gap-3">
          <a 
            href="#" 
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-primary to-emerald-500 text-white font-bold shadow-md shadow-primary/20 group-hover:scale-105 transition-transform duration-200">
              <span className="text-base font-black tracking-tight">◈</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight text-foreground flex items-center gap-1.5">
                CabNexus
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Fleet Ops
                </span>
              </span>
            </div>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="px-3.5 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground rounded-lg transition-colors hover:bg-muted/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-2.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={onSignIn}
            className="text-xs font-semibold text-muted-foreground hover:text-foreground"
          >
            Sign In
          </Button>

          <Button
            size="sm"
            onClick={onOpenDashboard}
            className="text-xs font-bold shadow-md shadow-primary/25 bg-primary hover:bg-primary/90 text-primary-foreground group"
          >
            <span>Open Dashboard</span>
            <ArrowRight className="h-3.5 w-3.5 ml-1.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 sm:hidden">
          <Button
            size="sm"
            onClick={onOpenDashboard}
            className="text-xs font-bold px-3 py-1.5 h-8 bg-primary text-primary-foreground"
          >
            Dashboard
          </Button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-border bg-card/95 backdrop-blur-xl px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="flex items-center justify-between px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/80 transition-colors"
              >
                <span>{link.label}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground/60" />
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-border flex flex-col gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setMobileMenuOpen(false);
                onSignIn?.();
              }}
              className="w-full text-xs font-semibold justify-center"
            >
              Sign In
            </Button>
            <Button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDashboard?.();
              }}
              className="w-full text-xs font-bold justify-center bg-primary text-primary-foreground"
            >
              <span>Open Dashboard</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
