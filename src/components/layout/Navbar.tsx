import React, { useState } from 'react';
import { 
  Building2, 
  Car, 
  Users, 
  ShieldCheck, 
  Menu, 
  X, 
  ChevronRight,
  Plus
} from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Hierarchy', href: '#hierarchy', icon: Building2 },
  { label: 'Cabs', href: '#cabs', icon: Car },
  { label: 'Drivers', href: '#drivers', icon: Users },
  { label: 'Compliance', href: '#compliance', icon: ShieldCheck, badge: 'Auto' },
];

interface NavbarProps {
  onOpenAction?: () => void;
}

export function Navbar({ onOpenAction }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/85 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg p-1">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-emerald-500 text-white font-black shadow-md shadow-primary/25 transition-transform duration-200 group-hover:scale-105">
              <span className="tracking-tighter text-base">CN</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-primary via-blue-600 to-emerald-500 bg-clip-text text-transparent">
                CabNexus
              </span>
              <span className="hidden sm:inline text-[11px] font-medium text-muted-foreground leading-none">
                Vendor Fleet & Hierarchy
              </span>
            </div>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                className="inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
                {item.badge && (
                  <Badge variant="secondary" className="px-1.5 py-0 text-[10px] font-semibold">
                    {item.badge}
                  </Badge>
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Controls & Mobile Toggle */}
        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex items-center gap-2">
            <Badge variant="success" className="px-2.5 py-1 text-xs">
              System Live
            </Badge>
          </div>

          {onOpenAction && (
            <Button size="sm" onClick={onOpenAction} className="shadow-sm">
              <Plus className="h-4 w-4 mr-1.5" />
              <span>Onboard</span>
            </Button>
          )}

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/80 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown / Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-card/95 backdrop-blur-lg px-4 pt-3 pb-5 shadow-lg md:hidden animate-in slide-in-from-top-2 duration-200">
          <div className="mb-3 flex items-center justify-between px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <span>Navigation</span>
            <Badge variant="success" className="text-[10px] py-0 px-2">
              Phase 1 Active
            </Badge>
          </div>
          <div className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted active:bg-muted/80"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-foreground">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span>{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <Badge variant="secondary" className="text-[10px]">
                        {item.badge}
                      </Badge>
                    )}
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </a>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-border flex flex-col gap-2">
            <div className="text-xs text-muted-foreground px-2">
              Delegated Authority &amp; Fleet Management
            </div>
            {onOpenAction && (
              <Button 
                variant="default" 
                size="sm" 
                className="w-full justify-center"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAction();
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Quick Onboard Vendor
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
