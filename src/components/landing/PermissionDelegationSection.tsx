import { useState } from 'react';
import {
  ArrowRight,
  Calendar,
  Save,
  CheckCircle2,
  RefreshCw,
  Car,
  Users,
  ShieldCheck,
  BookOpen,
  CreditCard,
  Lock,
  Check,
  X,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/common/Button';
import { INITIAL_PERMISSION_CATEGORIES, PermissionCategory } from '@/data/landingData';

// Category icon map
const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'Fleet Management': Car,
  'Driver Management': Users,
  'Compliance & Verification': ShieldCheck,
  'Bookings & Dispatch': BookOpen,
  'Financial Operations': CreditCard,
};

// Which categories are "sensitive" / restricted by default
const SENSITIVE_CATEGORIES = new Set(['Financial Operations']);

export function PermissionDelegationSection() {
  const [categories, setCategories] = useState<PermissionCategory[]>(INITIAL_PERMISSION_CATEGORIES);
  const [savedFeedback, setSavedFeedback] = useState(false);
  const [expandedCats, setExpandedCats] = useState<Set<string>>(
    new Set(['Fleet Management', 'Driver Management'])
  );

  const targetVendor = 'Punjab Regional Fleet';
  const sourceVendor = 'Super Vendor (India)';

  const togglePermission = (categoryIdx: number, permId: string) => {
    setCategories(prev => {
      const updated = [...prev];
      const category = { ...updated[categoryIdx] };
      category.permissions = category.permissions.map(p =>
        p.id === permId ? { ...p, checked: !p.checked } : p
      );
      updated[categoryIdx] = category;
      return updated;
    });
    setSavedFeedback(false);
  };

  const handleSave = () => {
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 3500);
  };

  const toggleExpand = (cat: string) => {
    setExpandedCats(prev => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });
  };

  const totalPermissions = categories.reduce((s, c) => s + c.permissions.length, 0);
  const activeCount = categories.reduce((s, c) => s + c.permissions.filter(p => p.checked).length, 0);

  return (
    <section id="permissions" className="py-16 sm:py-24 border-y border-border bg-muted/30 dark:bg-muted/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Two-column layout: header left, interactive right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left: Context */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <div className="space-y-3">
              <p className="section-label">Access Control</p>
              <h2 className="text-3xl sm:text-4xl text-foreground">
                Delegate access with precision.
              </h2>
              <p className="text-sm leading-7 text-muted-foreground">
                Grant operational authority to regional vendors — scoped, time-bound, and instantly auditable. Central governance stays with you.
              </p>
            </div>

            {/* Flow diagram — the "what" */}
            <div className="space-y-2">
              {/* Source node */}
              <div className="flex items-center gap-3 p-3 rounded-lg border border-primary/30 bg-primary/5">
                <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <rect x="0.5" y="0.5" width="4.5" height="4.5" rx="0.75" fill="white" fillOpacity="0.9" />
                    <rect x="7" y="0.5" width="4.5" height="4.5" rx="0.75" fill="white" fillOpacity="0.5" />
                    <rect x="0.5" y="7" width="4.5" height="4.5" rx="0.75" fill="white" fillOpacity="0.5" />
                    <rect x="7" y="7" width="4.5" height="4.5" rx="0.75" fill="white" fillOpacity="0.9" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-primary/70">Delegating From</p>
                  <p className="text-sm font-semibold text-foreground">{sourceVendor}</p>
                  <p className="text-[10px] text-muted-foreground">Level 1 · Full Authority</p>
                </div>
              </div>

              {/* Arrow connector */}
              <div className="flex items-center gap-2 pl-4">
                <div className="flex flex-col items-center gap-0.5">
                  <div className="w-px h-2 bg-border" />
                  <div className="h-5 w-5 rounded-full border-2 border-primary/40 bg-background flex items-center justify-center">
                    <ArrowRight className="h-2.5 w-2.5 text-primary" />
                  </div>
                  <div className="w-px h-2 bg-border" />
                </div>
                <div className="text-[10px] text-muted-foreground italic">
                  {activeCount} of {totalPermissions} permissions granted
                </div>
              </div>

              {/* Target node */}
              <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card">
                <div className="h-8 w-8 rounded-md bg-emerald-100 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center flex-shrink-0">
                  <Users className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Delegating To</p>
                  <p className="text-sm font-semibold text-foreground">{targetVendor}</p>
                  <p className="text-[10px] text-muted-foreground">Level 2 · Regional Hub</p>
                </div>
              </div>
            </div>

            {/* Time-bound expiry */}
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/60">
              <Calendar className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">Expires 31 Dec 2026</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Auto-reverts to base role on expiry. No manual action needed.</p>
              </div>
            </div>

            {/* Summary pill */}
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-300"
                  style={{ width: `${(activeCount / totalPermissions) * 100}%` }}
                />
              </div>
              <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                {activeCount}/{totalPermissions} active
              </span>
            </div>
          </div>

          {/* Right: Permission categories */}
          <div className="lg:col-span-8 space-y-2">

            {categories.map((cat, catIdx) => {
              const Icon = CATEGORY_ICONS[cat.category] ?? ShieldCheck;
              const granted = cat.permissions.filter(p => p.checked).length;
              const total = cat.permissions.length;
              const isExpanded = expandedCats.has(cat.category);
              const isSensitive = SENSITIVE_CATEGORIES.has(cat.category);
              const allGranted = granted === total;
              const noneGranted = granted === 0;

              return (
                <div
                  key={cat.category}
                  className={`rounded-lg border bg-card overflow-hidden transition-all duration-150 ${
                    isSensitive
                      ? 'border-rose-200 dark:border-rose-800/60'
                      : allGranted
                      ? 'border-emerald-200 dark:border-emerald-800/60'
                      : 'border-border'
                  }`}
                >
                  {/* Category header — clickable to expand */}
                  <button
                    type="button"
                    onClick={() => toggleExpand(cat.category)}
                    className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-muted/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-expanded={isExpanded}
                  >
                    {/* Icon */}
                    <div className={`h-8 w-8 rounded-md flex items-center justify-center flex-shrink-0 ${
                      isSensitive
                        ? 'bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-800/60'
                        : allGranted
                        ? 'bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800/60'
                        : noneGranted
                        ? 'bg-muted border border-border'
                        : 'bg-primary/5 border border-primary/20'
                    }`}>
                      <Icon className={`h-4 w-4 ${
                        isSensitive
                          ? 'text-rose-500'
                          : allGranted
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : noneGranted
                          ? 'text-muted-foreground'
                          : 'text-primary'
                      }`} />
                    </div>

                    {/* Name */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground">{cat.category}</span>
                        {isSensitive && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-rose-600 dark:text-rose-400">
                            <Lock className="h-2.5 w-2.5" />
                            Restricted
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        {/* Mini permission dots */}
                        <div className="flex gap-0.5">
                          {cat.permissions.map(p => (
                            <div
                              key={p.id}
                              className={`h-1.5 w-4 rounded-full transition-colors duration-150 ${
                                p.checked ? 'bg-primary' : 'bg-border'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[11px] text-muted-foreground">
                          {granted} of {total} permitted
                        </span>
                      </div>
                    </div>

                    {/* Status badge */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {allGranted && (
                        <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <Check className="h-3 w-3" /> Full
                        </span>
                      )}
                      {noneGranted && (
                        <span className="text-[10px] font-semibold text-muted-foreground flex items-center gap-1">
                          <X className="h-3 w-3" /> None
                        </span>
                      )}
                      <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-150 ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  {/* Expanded: individual permissions */}
                  {isExpanded && (
                    <div className="border-t border-border px-4 py-3 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {cat.permissions.map(perm => (
                        <label
                          key={perm.id}
                          className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-md cursor-pointer select-none transition-all duration-100 group ${
                            perm.checked
                              ? 'bg-primary/5 border border-primary/20 hover:border-primary/40'
                              : 'bg-background border border-border hover:border-border/80 opacity-70 hover:opacity-90'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            {/* State indicator */}
                            <div className={`h-5 w-5 rounded flex items-center justify-center flex-shrink-0 transition-colors ${
                              perm.checked
                                ? 'bg-primary border border-primary'
                                : 'bg-background border-2 border-border group-hover:border-muted-foreground'
                            }`}>
                              {perm.checked && <Check className="h-3 w-3 text-primary-foreground" />}
                            </div>
                            <span className={`text-xs font-medium transition-colors ${
                              perm.checked ? 'text-foreground' : 'text-muted-foreground'
                            }`}>
                              {perm.label}
                            </span>
                          </div>

                          <input
                            type="checkbox"
                            checked={perm.checked}
                            onChange={() => togglePermission(catIdx, perm.id)}
                            className="sr-only"
                          />

                          {perm.checked ? (
                            <span className="text-[9px] font-bold uppercase tracking-wider text-primary flex-shrink-0">
                              Granted
                            </span>
                          ) : (
                            <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground/60 flex-shrink-0">
                              Denied
                            </span>
                          )}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Action row */}
            <div className="flex items-center justify-between pt-3 border-t border-border mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCategories(INITIAL_PERMISSION_CATEGORIES)}
                className="text-xs h-8"
              >
                <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                Reset
              </Button>

              <Button
                size="sm"
                onClick={handleSave}
                className="text-xs font-semibold bg-primary text-primary-foreground h-8 px-4 group"
              >
                <Save className="h-3.5 w-3.5 mr-1.5" />
                Save Delegation
              </Button>
            </div>

            {/* Success feedback */}
            {savedFeedback && (
              <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs font-medium flex items-center gap-2 animate-in fade-in slide-in-from-bottom-1 duration-200">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                <span>Permissions delegated to <strong>{targetVendor}</strong> — changes take effect immediately.</span>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
