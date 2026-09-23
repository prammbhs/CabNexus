import { useLocation, useNavigate } from 'react-router-dom';
import { Sun, Moon, Bell, LogOut, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useRole } from '@/context/RoleContext';

const BREADCRUMBS: Record<string, string> = {
  '/dashboard': 'Overview',
  '/dashboard/vendors': 'Vendors & Hierarchy',
  '/dashboard/fleet': 'Fleet Registry',
  '/dashboard/drivers': 'Driver Roster',
  '/dashboard/compliance': 'Compliance Ledger',
  '/dashboard/permissions': 'Permission Delegation',
};

export function TopBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, currentUser, logout } = useRole();
  const [isDark, setIsDark] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const pageTitle = BREADCRUMBS[location.pathname] ?? 'Dashboard';

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    setIsDark(d => !d);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const levelColor = {
    1: 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800/60',
    2: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/60',
    3: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60',
    4: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/60',
    5: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700',
  }[currentUser.level];

  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 sm:px-6 flex-shrink-0 relative z-30">
      {/* Left: breadcrumb */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground hidden sm:inline">CabNexus</span>
        <span className="text-muted-foreground/40 hidden sm:inline text-xs">/</span>
        <h1 className="text-sm font-semibold text-foreground">{pageTitle}</h1>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2">
        {/* User Scope badge */}
        <div className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-semibold ${levelColor}`}>
          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
          <span>{currentUser.name}</span>
          <span className="opacity-60">({currentUser.levelBadge})</span>
        </div>

        {/* Notifications */}
        <button
          type="button"
          className="h-8 w-8 rounded-md border border-border text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary relative"
          aria-label="Notifications"
        >
          <Bell className="h-3.5 w-3.5" />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-rose-500" aria-hidden="true" />
        </button>

        {/* Theme toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          className="h-8 w-8 rounded-md border border-border text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="h-3.5 w-3.5 text-amber-400" /> : <Moon className="h-3.5 w-3.5" />}
        </button>

        {/* Profile Avatar with dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary hover:ring-2 hover:ring-primary/20 transition-all focus:outline-none"
            aria-label="User profile options"
          >
            {currentUser.avatarInitial}
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 rounded-xl border border-border bg-card p-3 shadow-xl space-y-2.5 animate-in fade-in duration-150">
              <div className="border-b border-border/50 pb-2">
                <p className="text-xs font-bold text-foreground">{currentUser.name}</p>
                <p className="text-[11px] text-muted-foreground truncate">{currentUser.email}</p>
                <p className="text-[10px] text-primary font-medium mt-0.5">{currentUser.roleTitle}</p>
              </div>

              <div className="text-[11px] text-muted-foreground space-y-1">
                <p><strong>Managing Entity:</strong> {currentUser.vendorName}</p>
                {currentUser.reportsToName && (
                  <p><strong>Reports to:</strong> {currentUser.reportsToName}</p>
                )}
              </div>

              <div className="pt-2 border-t border-border/50 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default TopBar;
