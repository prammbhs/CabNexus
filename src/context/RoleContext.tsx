import { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile, Vendor } from '@/data/dashboardData';
import { useHierarchyUsers, PermissionState, VendorPermissionsMap } from '@/hooks/useHierarchyUsers';

export type RoleId = 'super_vendor' | 'regional_vendor' | 'city_vendor' | 'local_vendor' | 'driver';

export interface Role {
  id: RoleId;
  title: string;
  level: 1 | 2 | 3 | 4 | 5;
  badge: string;
  description: string;
  vendorName: string;
  vendorScope: string;
}

export const ROLES: Role[] = [
  {
    id: 'super_vendor',
    level: 1,
    title: 'Super Vendor',
    badge: 'L1 · Global',
    description: 'Complete network oversight, permission delegation, compliance overrides, and full payouts.',
    vendorName: 'Super Vendor (India)',
    vendorScope: 'All Regions',
  },
  {
    id: 'regional_vendor',
    level: 2,
    title: 'Regional Vendor',
    badge: 'L2 · Regional',
    description: 'Fleet and driver management scoped to Regional Hubs and subordinate state fleets.',
    vendorName: 'North Region Hub',
    vendorScope: 'Regional Jurisdiction',
  },
  {
    id: 'city_vendor',
    level: 3,
    title: 'City Vendor',
    badge: 'L3 · City',
    description: 'Direct dispatch and vehicle allocation for City Fleets.',
    vendorName: 'Punjab State Fleet',
    vendorScope: 'City & State Fleet',
  },
  {
    id: 'local_vendor',
    level: 4,
    title: 'Local Vendor',
    badge: 'L4 · Local',
    description: 'Operate local municipal cabs and assigned drivers only.',
    vendorName: 'Amritsar Local Fleet',
    vendorScope: 'Amritsar only',
  },
  {
    id: 'driver',
    level: 5,
    title: 'Commercial Driver',
    badge: 'L5 · Driver',
    description: 'Assigned commercial cab operator with verified commercial license.',
    vendorName: 'Assigned Fleet',
    vendorScope: 'Assigned Fleet Vehicle',
  },
];

// RBAC access map — what each role can access
export const RBAC: Record<RoleId, {
  vendors: 'full' | 'subtree' | 'readonly' | 'hidden';
  fleet: 'full' | 'region' | 'city' | 'own';
  drivers: 'full' | 'region' | 'city' | 'own';
  compliance: 'full' | 'region' | 'city' | 'own';
  permissions: 'full' | 'delegate' | 'hidden';
}> = {
  super_vendor:    { vendors: 'full',     fleet: 'full',   drivers: 'full',   compliance: 'full',   permissions: 'full' },
  regional_vendor: { vendors: 'subtree',  fleet: 'region', drivers: 'region', compliance: 'region', permissions: 'delegate' },
  city_vendor:     { vendors: 'readonly', fleet: 'city',   drivers: 'city',   compliance: 'city',   permissions: 'delegate' },
  local_vendor:    { vendors: 'hidden',   fleet: 'own',    drivers: 'own',    compliance: 'own',    permissions: 'hidden' },
  driver:          { vendors: 'hidden',   fleet: 'own',    drivers: 'own',    compliance: 'own',    permissions: 'hidden' },
};

interface RoleContextValue {
  role: Role;
  currentUser: UserProfile;
  usersList: UserProfile[];
  vendorPermissions: VendorPermissionsMap;
  setRole: (id: RoleId) => void;
  loginAsUser: (userId: string) => void;
  logout: () => void;
  updateUserPermission: (userId: string, permKey: keyof UserProfile['permissions'], value: boolean) => void;
  updateVendorPermission: (vendorId: string, permKey: string, state: PermissionState) => void;
  getSubtreeVendorIds: (startVendorId: string) => Set<string>;
  getControlledVendors: (user: UserProfile) => Vendor[];
  isPermissionAvailableFromParent: (childVendorId: string, permKey: string) => boolean;
  isUserPermissionGrantedByParent: (supervisor: UserProfile, permKey: keyof UserProfile['permissions']) => boolean;
  can: (module: keyof typeof RBAC[RoleId]) => string;
}

const RoleContext = createContext<RoleContextValue | null>(null);

export function RoleProvider({ children }: { children: ReactNode }) {
  const {
    users: usersList,
    vendorPermissions,
    updateUserPermission,
    updateVendorPermission,
    getSubtreeVendorIds,
    getControlledVendors,
    isPermissionAvailableFromParent,
    isUserPermissionGrantedByParent,
  } = useHierarchyUsers();

  const [currentUserId, setCurrentUserId] = useState<string>('usr-001');

  const currentUser = usersList.find((u) => u.id === currentUserId) || usersList[0];
  const role = ROLES.find((r) => r.id === currentUser.roleId) || ROLES[0];

  const setRole = (id: RoleId) => {
    const matchedUser = usersList.find((u) => u.roleId === id);
    if (matchedUser) {
      setCurrentUserId(matchedUser.id);
    }
  };

  const loginAsUser = (userId: string) => {
    setCurrentUserId(userId);
  };

  const logout = () => {};

  const can = (module: keyof typeof RBAC[RoleId]) => RBAC[currentUser.roleId][module];

  return (
    <RoleContext.Provider
      value={{
        role,
        currentUser,
        usersList,
        vendorPermissions,
        setRole,
        loginAsUser,
        logout,
        updateUserPermission,
        updateVendorPermission,
        getSubtreeVendorIds,
        getControlledVendors,
        isPermissionAvailableFromParent,
        isUserPermissionGrantedByParent,
        can,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error('useRole must be used within RoleProvider');
  return ctx;
}
