import { useState, useEffect, useCallback } from 'react';
import { UserProfile, Vendor, VENDORS } from '@/data/dashboardData';
import { HIERARCHY_USERS_STORE } from '@/data/usersData';

const USERS_STORAGE_KEY = 'cabnexus_users_hierarchy_v2';
const VENDOR_PERMS_STORAGE_KEY = 'cabnexus_vendor_permissions_v1';

// Initial permission policies across vendors
export type PermissionState = 'granted' | 'restricted' | 'blocked';

export interface VendorPermissionsMap {
  [vendorId: string]: {
    [permKey: string]: PermissionState;
  };
}

const DEFAULT_VENDOR_PERMISSIONS: VendorPermissionsMap = {
  'v-root': {
    fleet_add: 'granted',
    fleet_hold: 'granted',
    fleet_decommission: 'granted',
    driver_onboard: 'granted',
    driver_unbind: 'granted',
    driver_blacklist: 'granted',
    sub_create: 'granted',
    sub_cap_override: 'granted',
    sub_suspend: 'granted',
  },
  'v-north': {
    fleet_add: 'granted',
    fleet_hold: 'granted',
    fleet_decommission: 'restricted',
    driver_onboard: 'granted',
    driver_unbind: 'granted',
    driver_blacklist: 'blocked',
    sub_create: 'granted',
    sub_cap_override: 'restricted',
    sub_suspend: 'granted',
  },
  'v-south': {
    fleet_add: 'granted',
    fleet_hold: 'granted',
    fleet_decommission: 'restricted',
    driver_onboard: 'granted',
    driver_unbind: 'granted',
    driver_blacklist: 'blocked',
    sub_create: 'granted',
    sub_cap_override: 'restricted',
    sub_suspend: 'granted',
  },
  'v-punjab': {
    fleet_add: 'granted',
    fleet_hold: 'granted',
    fleet_decommission: 'blocked',
    driver_onboard: 'granted',
    driver_unbind: 'granted',
    driver_blacklist: 'blocked',
    sub_create: 'granted',
    sub_cap_override: 'blocked',
    sub_suspend: 'restricted',
  },
  'v-haryana': {
    fleet_add: 'granted',
    fleet_hold: 'granted',
    fleet_decommission: 'blocked',
    driver_onboard: 'granted',
    driver_unbind: 'granted',
    driver_blacklist: 'blocked',
    sub_create: 'restricted',
    sub_cap_override: 'blocked',
    sub_suspend: 'restricted',
  },
  'v-karnataka': {
    fleet_add: 'granted',
    fleet_hold: 'granted',
    fleet_decommission: 'blocked',
    driver_onboard: 'granted',
    driver_unbind: 'granted',
    driver_blacklist: 'blocked',
    sub_create: 'granted',
    sub_cap_override: 'blocked',
    sub_suspend: 'restricted',
  },
  'v-telangana': {
    fleet_add: 'restricted',
    fleet_hold: 'granted',
    fleet_decommission: 'blocked',
    driver_onboard: 'restricted',
    driver_unbind: 'restricted',
    driver_blacklist: 'blocked',
    sub_create: 'blocked',
    sub_cap_override: 'blocked',
    sub_suspend: 'blocked',
  },
  'v-amritsar': {
    fleet_add: 'granted',
    fleet_hold: 'restricted',
    fleet_decommission: 'blocked',
    driver_onboard: 'granted',
    driver_unbind: 'restricted',
    driver_blacklist: 'blocked',
    sub_create: 'blocked',
    sub_cap_override: 'blocked',
    sub_suspend: 'blocked',
  },
};

/**
 * Custom hook to load and manage the hierarchical personnel tree & vendor permission policies
 */
export function useHierarchyUsers() {
  const [users, setUsers] = useState<UserProfile[]>(() => {
    try {
      const saved = localStorage.getItem(USERS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Unable to read users from localStorage');
    }
    return HIERARCHY_USERS_STORE;
  });

  const [vendorPermissions, setVendorPermissions] = useState<VendorPermissionsMap>(() => {
    try {
      const saved = localStorage.getItem(VENDOR_PERMS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Unable to read vendor permissions from localStorage');
    }
    return DEFAULT_VENDOR_PERMISSIONS;
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch (e) {
      console.warn('Unable to persist users');
    }
  }, [users]);

  useEffect(() => {
    try {
      localStorage.setItem(VENDOR_PERMS_STORAGE_KEY, JSON.stringify(vendorPermissions));
    } catch (e) {
      console.warn('Unable to persist vendor permissions');
    }
  }, [vendorPermissions]);

  // Update a single user's permission
  const updateUserPermission = useCallback(
    (userId: string, permKey: keyof UserProfile['permissions'], value: boolean) => {
      setUsers((prev) =>
        prev.map((user) => {
          if (user.id !== userId) return user;
          return {
            ...user,
            permissions: {
              ...user.permissions,
              [permKey]: value,
            },
          };
        })
      );
    },
    []
  );

  // Update a vendor entity's permission state
  const updateVendorPermission = useCallback(
    (vendorId: string, permKey: string, state: PermissionState) => {
      setVendorPermissions((prev) => ({
        ...prev,
        [vendorId]: {
          ...(prev[vendorId] || {}),
          [permKey]: state,
        },
      }));
    },
    []
  );

  // Helper to get descendant vendor IDs for any vendor using tree traversal
  const getSubtreeVendorIds = useCallback((startVendorId: string): Set<string> => {
    const result = new Set<string>();
    result.add(startVendorId);

    const traverse = (parentId: string) => {
      const children = VENDORS.filter((v) => v.parentId === parentId);
      for (const child of children) {
        result.add(child.id);
        traverse(child.id);
      }
    };

    traverse(startVendorId);
    return result;
  }, []);

  // Get all vendors strictly controlled by a user
  const getControlledVendors = useCallback(
    (user: UserProfile): Vendor[] => {
      if (user.roleId === 'super_vendor' || user.vendorId === 'v-root') {
        return VENDORS.filter((v) => v.level > 1);
      }
      const controlledIds = getSubtreeVendorIds(user.vendorId);
      return VENDORS.filter((v) => controlledIds.has(v.id));
    },
    [getSubtreeVendorIds]
  );

  // Check if a parent vendor has granted a permission
  // If parent vendor has NOT granted (i.e. blocked or restricted), child cannot have or manage it
  const isPermissionAvailableFromParent = useCallback(
    (childVendorId: string, permKey: string): boolean => {
      const child = VENDORS.find((v) => v.id === childVendorId);
      if (!child || !child.parentId) return true; // Root vendor has all permissions

      const parentPerms = vendorPermissions[child.parentId];
      if (!parentPerms) return true;

      const parentState = parentPerms[permKey];
      // If parent is blocked, it is NOT granted to child
      return parentState === 'granted';
    },
    [vendorPermissions]
  );

  // Check if a parent supervisor / higher level has granted a permission
  // If the parent/higher entity does not have the permission, it cannot be delegated to child subordinates
  const isUserPermissionGrantedByParent = useCallback(
    (supervisor: UserProfile, permKey: keyof UserProfile['permissions']): boolean => {
      // Super Vendor (L1) has all root authorities
      if (supervisor.level === 1) return true;
      return Boolean(supervisor.permissions[permKey]);
    },
    []
  );

  return {
    users,
    vendorPermissions,
    updateUserPermission,
    updateVendorPermission,
    getSubtreeVendorIds,
    getControlledVendors,
    isPermissionAvailableFromParent,
    isUserPermissionGrantedByParent,
  };
}
