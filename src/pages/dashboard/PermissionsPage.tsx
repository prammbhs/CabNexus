import { useState } from 'react';
import { useRole } from '@/context/RoleContext';
import {
  Users,
  History,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';
import { UserProfile } from '@/data/dashboardData';

export function PermissionsPage() {
  const {
    currentUser,
    usersList,
    updateUserPermission,
    getControlledVendors,
    isUserPermissionGrantedByParent,
  } = useRole();

  // Subordinate vendors that this user can inspect and configure
  const controlledVendors = getControlledVendors(currentUser);

  // Filter selectable subordinate personnel:
  // Must have strictly lower privilege level (target.level > currentUser.level)
  // and must report to or be within currentUser's organization hierarchy
  const configurableUsers = usersList.filter((u) => {
    // Cannot configure users with equal or higher privilege
    if (u.level <= currentUser.level) return false;

    // Super Vendor (L1) can configure all subordinate levels (L2, L3, L4, L5)
    if (currentUser.level === 1) return true;

    // Regional Leader (L2) can configure personnel in their controlled vendor subtree
    if (currentUser.level === 2) {
      const controlledVendorIds = new Set(controlledVendors.map((v) => v.id));
      return controlledVendorIds.has(u.vendorId) || u.reportsToId === currentUser.id;
    }

    // City Vendor (L3) can configure child vendors (L4) and drivers (L5) under their subtree
    if (currentUser.level === 3) {
      const controlledVendorIds = new Set(controlledVendors.map((v) => v.id));
      return (controlledVendorIds.has(u.vendorId) && u.level > 3) || u.reportsToId === currentUser.id;
    }

    // Local Vendor (L4) can only configure drivers under them
    if (currentUser.level === 4) {
      return u.level === 5 && (u.reportsToId === currentUser.id || u.vendorId === currentUser.vendorId);
    }

    return false;
  });

  // Selected subordinate user for permission override
  const [targetUserId, setTargetUserId] = useState<string>(
    configurableUsers[0]?.id || usersList[usersList.length - 1].id
  );

  const targetUser =
    configurableUsers.find((u) => u.id === targetUserId) ||
    configurableUsers[0] ||
    null;

  const [auditLog, setAuditLog] = useState([
    { id: 'aud-1', user: 'Arjun Mehta (L1 Super Vendor)', target: 'Gurjeet Kaur (L3)', action: 'Authorized privilege: canOnboardVehicles', time: '2 hours ago' },
    { id: 'aud-2', user: 'Harpreet Singh (L2 Regional)', target: 'Manpreet Gill (L4)', action: 'Restricted privilege: canHoldVehicles', time: 'Yesterday at 18:40' },
    { id: 'aud-3', user: 'System Security Engine', target: 'Raj Kumar (L5 Driver)', action: 'Revoked privilege: canApproveCompliance (Role Prohibition)', time: 'Sep 21, 2026' },
  ]);

  const handleToggleUserPermission = (permKey: keyof UserProfile['permissions'], currentValue: boolean) => {
    if (!targetUser) return;
    const newValue = !currentValue;
    updateUserPermission(targetUser.id, permKey, newValue);

    // Append to audit trail
    const newAudit = {
      id: `aud-${Date.now()}`,
      user: `${currentUser.name} (${currentUser.levelBadge})`,
      target: `${targetUser.name} (${targetUser.roleTitle})`,
      action: `${newValue ? 'Authorized' : 'Revoked'} privilege: ${permKey}`,
      time: 'Just now',
    };
    setAuditLog([newAudit, ...auditLog]);
  };

  const canModifySelected =
    targetUser !== null &&
    currentUser.level < targetUser.level &&
    (currentUser.level <= 2 || currentUser.id === targetUser.reportsToId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-foreground">Subordinate & Driver Permission Management</h1>
            <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              Authority Engine
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage, delegate, or restrict granular privileges strictly for subordinates and drivers under your hierarchy jurisdiction.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg border border-border bg-card text-foreground">
          <Users className="h-4 w-4 text-primary" />
          <span>Scope: {currentUser.roleTitle}</span>
        </div>
      </div>

      {/* Subordinate Leaders & Drivers Privilege Overrides */}
      <div className="space-y-6">
          {/* Target Personnel Picker */}
          <div className="p-4 rounded-xl border border-border/70 bg-card shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/50 pb-3">
              <div>
                <h2 className="text-sm font-bold text-foreground">Select Subordinate Leader or Driver to Configure</h2>
                <p className="text-xs text-muted-foreground">
                  Logged in as <strong>{currentUser.name}</strong> ({currentUser.levelBadge})
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Select Subordinate:</span>
                {configurableUsers.length > 0 ? (
                  <select
                    value={targetUserId}
                    onChange={(e) => setTargetUserId(e.target.value)}
                    className="px-3 py-1.5 rounded-lg border border-border bg-background text-xs font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    {configurableUsers.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} — {u.levelBadge} ({u.vendorName})
                      </option>
                    ))}
                  </select>
                ) : (
                  <span className="text-xs text-muted-foreground italic px-2 py-1 bg-muted rounded">
                    No lower-tier subordinates assigned
                  </span>
                )}
              </div>
            </div>

            {/* Target Profile Card */}
            {targetUser ? (
              <>
                <div className="p-3.5 rounded-lg bg-muted/40 border border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                      {targetUser.avatarInitial}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground text-sm">{targetUser.name}</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                          {targetUser.levelBadge}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {targetUser.email} · Phone: {targetUser.phone} · Managing: <strong>{targetUser.vendorName}</strong>
                      </p>
                    </div>
                  </div>

                  {canModifySelected ? (
                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                      Authorized to Modify Subordinate Privileges
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                      Cannot Modify (Equal, Higher, or Unrelated Hierarchy)
                    </span>
                  )}
                </div>

                {/* Granular User Permissions List */}
                <div className="divide-y divide-border/40 text-xs">
                  {[
                    {
                      key: 'canOnboardVehicles' as const,
                      name: 'Vehicle & Cab Onboarding',
                      desc: 'Ability to register new cabs, commercial taxi plates, and upload initial RC/permit records.',
                    },
                    {
                      key: 'canOnboardDrivers' as const,
                      name: 'Commercial Driver Onboarding',
                      desc: 'Ability to roster new drivers with commercial badges and bind them 1:1 to cabs.',
                    },
                    {
                      key: 'canHoldVehicles' as const,
                      name: 'Emergency Dispatch Hold Toggle',
                      desc: 'Power to instantly place non-compliant or compromised vehicles on dispatch hold.',
                    },
                    {
                      key: 'canApproveCompliance' as const,
                      name: 'Document Audit Sign-Off & Approval',
                      desc: 'Authority to clear pending compliance documents (Insurance, Permits, PUC) into the active fleet ledger.',
                    },
                    {
                      key: 'canDelegatePermissions' as const,
                      name: 'Sub-Tier Authority Delegation',
                      desc: 'Authority to grant or revoke specific operational permissions to child vendors.',
                    },
                    {
                      key: 'canOverrideSubVendors' as const,
                      name: 'Super Vendor Action Override',
                      desc: 'Highest-level authority to override any subordinate vendor action across the national network.',
                    },
                  ]
                    // If current user does NOT have permission, it cannot be shown to or managed for subordinate child
                    .filter((perm) => isUserPermissionGrantedByParent(currentUser, perm.key))
                    .map((perm) => {
                      const isGranted = Boolean(targetUser.permissions[perm.key]);
                      const isDriverComplianceApproval = targetUser.roleId === 'driver' && perm.key === 'canApproveCompliance';

                      return (
                        <div key={perm.key} className="py-3 flex items-center justify-between gap-4">
                          <div className="space-y-0.5 max-w-xl">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-foreground text-xs">{perm.name}</p>
                              {isDriverComplianceApproval && (
                                <span className="text-[10px] text-destructive bg-destructive/10 px-2 py-0.5 rounded font-mono font-bold">
                                  Strictly Prohibited for Commercial Drivers
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-muted-foreground leading-relaxed">{perm.desc}</p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              disabled={!canModifySelected || isDriverComplianceApproval}
                              onClick={() => handleToggleUserPermission(perm.key, isGranted)}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                                isGranted
                                  ? 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700'
                                  : 'bg-muted text-muted-foreground border-border hover:text-foreground'
                              } disabled:opacity-50 disabled:cursor-not-allowed`}
                              title={isDriverComplianceApproval ? 'Drivers cannot approve regulatory compliance documents' : undefined}
                            >
                              {isGranted ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
                              {isGranted ? 'Authorized' : 'Restricted'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </>
            ) : (
              <div className="p-6 text-center text-muted-foreground text-xs">
                No subordinate users available under your current hierarchy scope.
              </div>
            )}
          </div>
        </div>

      {/* Immutable Audit Log */}
      <div className="rounded-xl border border-border/70 bg-card p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-border/50 pb-3">
          <div className="flex items-center gap-2">
            <History className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Delegation & Authority Audit Log</h3>
          </div>
          <span className="text-[11px] font-mono text-muted-foreground">Tamper-Proof Ledger</span>
        </div>

        <div className="space-y-2.5 text-xs">
          {auditLog.map((audit) => (
            <div key={audit.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2.5 rounded-lg bg-muted/40 border border-border/40">
              <div>
                <span className="font-semibold text-foreground">{audit.user}</span>
                <span className="text-muted-foreground"> → {audit.target}: </span>
                <span className="text-foreground/90 font-medium">{audit.action}</span>
              </div>
              <span className="text-[10px] text-muted-foreground font-mono self-end sm:self-auto">
                {audit.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PermissionsPage;
