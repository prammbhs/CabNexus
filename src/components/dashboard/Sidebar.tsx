import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Car,
  Users,
  ShieldCheck,
  Lock,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
} from 'lucide-react';
import { useRole, RBAC, RoleId } from '@/context/RoleContext';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  rbacKey?: keyof typeof RBAC[RoleId];
  hiddenValues?: string[];
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Overview',    href: '/dashboard',             icon: LayoutDashboard },
  { label: 'Vendors',     href: '/dashboard/vendors',     icon: Building2,  rbacKey: 'vendors',     hiddenValues: ['hidden'] },
  { label: 'Fleet',       href: '/dashboard/fleet',       icon: Car,        rbacKey: 'fleet' },
  { label: 'Drivers',     href: '/dashboard/drivers',     icon: Users,      rbacKey: 'drivers' },
  { label: 'Compliance',  href: '/dashboard/compliance',  icon: ShieldCheck,rbacKey: 'compliance' },
  { label: 'Permissions', href: '/dashboard/permissions', icon: Lock,       rbacKey: 'permissions', hiddenValues: ['hidden'] },
];

export function Sidebar() {
  const { role, currentUser, logout, can } = useRole();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const visibleItems = NAV_ITEMS.filter(item => {
    if (!item.rbacKey) return true;
    const access = can(item.rbacKey);
    return !item.hiddenValues?.includes(access);
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside
      className={`hidden md:flex flex-col border-r border-border bg-card transition-all duration-200 ${
        collapsed ? 'w-[64px]' : 'w-[230px]'
      }`}
    >
      {/* Logo */}
      <div className={`h-14 flex items-center border-b border-border flex-shrink-0 ${collapsed ? 'justify-center px-0' : 'px-4 gap-2.5'}`}>
        <div className="h-7 w-7 rounded bg-primary flex items-center justify-center flex-shrink-0 text-white shadow-sm">
          <svg width="12" height="12" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <rect x="0.5" y="0.5" width="4" height="4" rx="0.75" fill="white" fillOpacity="0.9" />
            <rect x="5.5" y="0.5" width="4" height="4" rx="0.75" fill="white" fillOpacity="0.5" />
            <rect x="0.5" y="5.5" width="4" height="4" rx="0.75" fill="white" fillOpacity="0.5" />
            <rect x="5.5" y="5.5" width="4" height="4" rx="0.75" fill="white" fillOpacity="0.9" />
          </svg>
        </div>
        {!collapsed && (
          <div className="flex flex-col leading-none">
            <span className="font-bold text-sm tracking-tight text-foreground">CabNexus</span>
            <span className="text-[10px] text-muted-foreground mt-0.5">Fleet Governance</span>
          </div>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
        {visibleItems.map(item => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === '/dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isActive
                    ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                } ${collapsed ? 'justify-center px-0 w-10 h-10 mx-auto' : ''}`
              }
              title={collapsed ? item.label : undefined}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* User Card info & Logout */}
      <div className={`border-t border-border p-2.5 space-y-1.5 ${collapsed ? 'flex flex-col items-center' : ''}`}>
        {!collapsed && (
          <div className="px-2 py-2 rounded-lg bg-muted/40 border border-border/50 mb-1">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs flex-shrink-0">
                {currentUser.avatarInitial}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-foreground truncate">{currentUser.name}</p>
                <p className="text-[10px] text-muted-foreground truncate">{currentUser.email}</p>
              </div>
            </div>
            <div className="mt-1.5 pt-1.5 border-t border-border/40 flex items-center justify-between">
              <span className="text-[10px] font-semibold text-primary">{currentUser.levelBadge}</span>
              <span className="text-[10px] text-muted-foreground">{currentUser.vendorName.split(' ')[0]}</span>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={handleLogout}
          className={`flex items-center gap-2 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors px-2.5 py-2 w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${collapsed ? 'justify-center px-0 w-10 h-10' : ''}`}
          title="Sign Out"
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {!collapsed && <span className="font-medium">Sign Out</span>}
        </button>

        {/* Collapse toggle */}
        <button
          type="button"
          onClick={() => setCollapsed(c => !c)}
          className={`flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-lg transition-colors px-2.5 py-1.5 w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${collapsed ? 'justify-center px-0 w-10 h-10' : ''}`}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {!collapsed && <span className="text-[11px]">Collapse Menu</span>}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
