import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Check, ArrowRight, UserCheck, KeyRound, Building2 } from 'lucide-react';
import { useRole } from '@/context/RoleContext';

export function LoginPage() {
  const navigate = useNavigate();
  const { usersList, currentUser, loginAsUser } = useRole();
  const [selectedUserId, setSelectedUserId] = useState<string>(currentUser.id);

  const selectedUser = usersList.find((u) => u.id === selectedUserId) || usersList[0];

  const handleSelectUser = (id: string) => {
    setSelectedUserId(id);
    loginAsUser(id);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsUser(selectedUserId);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background ambient decorative glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-20 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl opacity-20"
      >
        <div className="aspect-[1000/500] w-[50rem] bg-gradient-to-tr from-primary/30 to-amber-500/20" />
      </div>

      <div className="w-full max-w-xl space-y-6">
        {/* Brand identity header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-sm">
              <svg width="14" height="14" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <rect x="0.5" y="0.5" width="4" height="4" rx="0.75" fill="currentColor" fillOpacity="0.95" />
                <rect x="5.5" y="0.5" width="4" height="4" rx="0.75" fill="currentColor" fillOpacity="0.55" />
                <rect x="0.5" y="5.5" width="4" height="4" rx="0.75" fill="currentColor" fillOpacity="0.55" />
                <rect x="5.5" y="5.5" width="4" height="4" rx="0.75" fill="currentColor" fillOpacity="0.95" />
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">CabNexus Portal</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">Authorized System Access</h2>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Select an authorized employee or driver profile to enter the hierarchical governance environment.
          </p>
        </div>

        {/* User Account Profiles Selection */}
        <form onSubmit={handleSignIn} className="rounded-xl border border-border/70 bg-card p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-border/50 pb-3">
            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold text-foreground">Operating Personnel & Privilege Level</span>
            </div>
            <span className="text-[10px] text-muted-foreground font-mono">{usersList.length} Authorized Personnel</span>
          </div>

          <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
            {usersList.map((user) => {
              const isSelected = selectedUserId === user.id;

              return (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => handleSelectUser(user.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs flex items-start gap-3 relative ${
                    isSelected
                      ? 'border-primary bg-primary/5 ring-1 ring-primary/40 shadow-sm'
                      : 'border-border/70 hover:border-border hover:bg-muted/40'
                  }`}
                >
                  {/* Avatar Icon */}
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground/80'
                    }`}
                  >
                    {user.avatarInitial}
                  </div>

                  {/* Account Details */}
                  <div className="flex-1 min-w-0 pr-1">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground text-sm tracking-tight">{user.name}</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded border border-primary/20 bg-primary/10 text-primary">
                          {user.levelBadge}
                        </span>
                      </div>
                      {isSelected && (
                        <span className="text-[10px] font-bold text-primary flex items-center gap-0.5">
                          <Check className="h-3 w-3 stroke-[3]" /> Active
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-muted-foreground">{user.email}</p>

                    <div className="mt-2 text-[11px] text-foreground/80 flex flex-wrap items-center gap-2 pt-1 border-t border-border/40">
                      <span className="flex items-center gap-1">
                        <Building2 className="h-3 w-3 text-muted-foreground" />
                        <strong>Managing:</strong> {user.vendorName}
                      </span>
                      {user.reportsToName && (
                        <span className="text-muted-foreground">
                          · <strong>Reports to:</strong> {user.reportsToName}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Action button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-primary text-primary-foreground font-semibold text-xs transition-all hover:opacity-95 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Sign In as {selectedUser.name} ({selectedUser.levelBadge})
              <ArrowRight className="h-4 w-4 ml-0.5" />
            </button>
          </div>
        </form>

        {/* Security footnote */}
        <div className="text-center pt-1">
          <p className="text-[11px] text-muted-foreground/80 flex items-center justify-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            CabNexus Multi-Level RBAC Engine · Enterprise Single Sign-On Ready
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
