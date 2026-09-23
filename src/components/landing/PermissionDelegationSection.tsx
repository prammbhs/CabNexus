import { useState } from 'react';
import { 
  ArrowRight, 
  Calendar, 
  Save, 
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { INITIAL_PERMISSION_CATEGORIES, PermissionCategory } from '@/data/landingData';

export function PermissionDelegationSection() {
  const [categories, setCategories] = useState<PermissionCategory[]>(INITIAL_PERMISSION_CATEGORIES);
  const targetVendor = 'Punjab Regional Fleet (Level 2)';
  const [savedFeedback, setSavedFeedback] = useState(false);

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
    setTimeout(() => {
      setSavedFeedback(false);
    }, 3500);
  };

  const totalPermissions = categories.reduce((sum, c) => sum + c.permissions.length, 0);
  const activeCount = categories.reduce(
    (sum, c) => sum + c.permissions.filter(p => p.checked).length, 
    0
  );

  return (
    <section id="permissions" className="py-16 sm:py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="outline" className="text-xs font-semibold px-2.5 py-0.5">
            Role-Based Access &amp; Delegation
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground">
            Give every vendor the right access.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Delegate day-to-day fleet and driver operations to trusted regional hubs without relinquishing centralized financial or governance authority.
          </p>
        </div>

        {/* Interactive Delegation Interface Card */}
        <div className="mt-12 max-w-4xl mx-auto rounded-2xl border border-border/80 bg-card shadow-lg p-5 sm:p-8 space-y-6">
          
          {/* Delegation Metadata Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-border/60">
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">Delegation Flow</span>
              <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                <span className="text-primary">Super Vendor (India)</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <span className="text-emerald-600 dark:text-emerald-400">{targetVendor}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="success" className="text-xs">
                Active Delegation
              </Badge>
              <span className="text-xs text-muted-foreground font-mono">
                {activeCount} of {totalPermissions} Permitted
              </span>
            </div>
          </div>

          {/* Permission Categories Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((cat, catIdx) => (
              <div key={cat.category} className="rounded-xl bg-muted/30 border border-border/60 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
                    {cat.category}
                  </h3>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {cat.permissions.filter(p => p.checked).length}/{cat.permissions.length}
                  </span>
                </div>

                <div className="space-y-2">
                  {cat.permissions.map((perm) => (
                    <label
                      key={perm.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-background/80 border border-border/50 hover:border-primary/40 cursor-pointer transition-colors text-xs select-none"
                    >
                      <span className={`font-medium ${perm.checked ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {perm.label}
                      </span>
                      <input
                        type="checkbox"
                        checked={perm.checked}
                        onChange={() => togglePermission(catIdx, perm.id)}
                        className="h-4 w-4 rounded border-border text-primary focus:ring-primary accent-primary"
                      />
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Time-bound validity & Action Toolbar */}
          <div className="pt-4 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="h-4 w-4 text-primary shrink-0" />
              <span>Delegation Expiration: <strong>31 Dec 2026</strong> (Auto-reverts to base role)</span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCategories(INITIAL_PERMISSION_CATEGORIES)}
                className="text-xs"
              >
                <RefreshCw className="h-3.5 w-3.5 mr-1" />
                Reset Defaults
              </Button>

              <Button
                size="sm"
                onClick={handleSave}
                className="text-xs font-bold bg-primary text-primary-foreground"
              >
                <Save className="h-3.5 w-3.5 mr-1.5" />
                Save Delegation
              </Button>
            </div>
          </div>

          {/* Feedback message */}
          {savedFeedback && (
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Permissions delegated to {targetVendor} updated successfully. Sub-vendor view reflects changes immediately.</span>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
