// ─── Vendor / Hierarchy ────────────────────────────────────────────────────

export interface Vendor {
  id: string;
  name: string;
  level: 1 | 2 | 3 | 4;
  parentId: string | null;
  city: string;
  state: string;
  contactName: string;
  contactPhone: string;
  status: 'Active' | 'Suspended' | 'Pending';
  vehicles: number;
  drivers: number;
  complianceRate: number; // 0-100
  createdAt: string;
}

export const VENDORS: Vendor[] = [
  { id: 'v-root', name: 'Super Vendor (India)', level: 1, parentId: null,    city: 'New Delhi',  state: 'Delhi',         contactName: 'Arjun Mehta',    contactPhone: '+91 98100 00001', status: 'Active',    vehicles: 958, drivers: 921, complianceRate: 96, createdAt: '2023-01-15' },
  { id: 'v-north', name: 'North Region Hub',    level: 2, parentId: 'v-root', city: 'Chandigarh', state: 'Punjab',        contactName: 'Harpreet Singh', contactPhone: '+91 98100 00002', status: 'Active',    vehicles: 490, drivers: 472, complianceRate: 94, createdAt: '2023-03-10' },
  { id: 'v-punjab', name: 'Punjab State Fleet', level: 3, parentId: 'v-north',city: 'Amritsar',   state: 'Punjab',        contactName: 'Gurjeet Kaur',   contactPhone: '+91 98100 00003', status: 'Active',    vehicles: 248, drivers: 241, complianceRate: 97, createdAt: '2023-04-01' },
  { id: 'v-amritsar', name: 'Amritsar Local Fleet', level: 4, parentId: 'v-punjab', city: 'Amritsar', state: 'Punjab',   contactName: 'Manpreet Gill',  contactPhone: '+91 98100 00010', status: 'Active',    vehicles: 82,  drivers: 79,  complianceRate: 98, createdAt: '2023-05-20' },
  { id: 'v-haryana', name: 'Haryana Transit',   level: 3, parentId: 'v-north',city: 'Gurugram',   state: 'Haryana',       contactName: 'Rahul Verma',    contactPhone: '+91 98100 00004', status: 'Active',    vehicles: 242, drivers: 231, complianceRate: 91, createdAt: '2023-04-15' },
  { id: 'v-south', name: 'South Region Hub',    level: 2, parentId: 'v-root', city: 'Bengaluru',  state: 'Karnataka',     contactName: 'Priya Nair',     contactPhone: '+91 98100 00005', status: 'Active',    vehicles: 468, drivers: 449, complianceRate: 97, createdAt: '2023-03-20' },
  { id: 'v-karnataka', name: 'Karnataka Fleet', level: 3, parentId: 'v-south',city: 'Bengaluru',  state: 'Karnataka',     contactName: 'Deepak Rao',     contactPhone: '+91 98100 00006', status: 'Active',    vehicles: 234, drivers: 229, complianceRate: 98, createdAt: '2023-05-01' },
  { id: 'v-telangana', name: 'Telangana Cabs',  level: 3, parentId: 'v-south',city: 'Hyderabad',  state: 'Telangana',     contactName: 'Srinivas Reddy', contactPhone: '+91 98100 00007', status: 'Suspended', vehicles: 234, drivers: 220, complianceRate: 95, createdAt: '2023-05-10' },
];

// ─── Hierarchy Users (Real mock users with email, level, permissions) ──────

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  roleId: 'super_vendor' | 'regional_vendor' | 'city_vendor' | 'local_vendor' | 'driver';
  roleTitle: string;
  levelBadge: string;
  level: 1 | 2 | 3 | 4 | 5;
  avatarInitial: string;
  vendorId: string;
  vendorName: string;
  reportsToId: string | null;
  reportsToName: string | null;
  permissions: {
    canOnboardVehicles: boolean;
    canOnboardDrivers: boolean;
    canHoldVehicles: boolean;
    canApproveCompliance: boolean;
    canDelegatePermissions: boolean;
    canOverrideSubVendors: boolean;
    canViewAllRegions: boolean;
  };
}

export const HIERARCHY_USERS: UserProfile[] = [
  {
    id: 'usr-001',
    name: 'Arjun Mehta',
    email: 'arjun.mehta@cabnexus.in',
    phone: '+91 98100 00001',
    roleId: 'super_vendor',
    roleTitle: 'Super Vendor / National Fleet Head',
    levelBadge: 'L1 · Super Vendor',
    level: 1,
    avatarInitial: 'A',
    vendorId: 'v-root',
    vendorName: 'Super Vendor (India)',
    reportsToId: null,
    reportsToName: null,
    permissions: {
      canOnboardVehicles: true,
      canOnboardDrivers: true,
      canHoldVehicles: true,
      canApproveCompliance: true,
      canDelegatePermissions: true,
      canOverrideSubVendors: true,
      canViewAllRegions: true,
    },
  },
  {
    id: 'usr-002',
    name: 'Harpreet Singh',
    email: 'harpreet.singh@northhub.cabnexus.in',
    phone: '+91 98100 00002',
    roleId: 'regional_vendor',
    roleTitle: 'Regional Hub Director (North)',
    levelBadge: 'L2 · Regional Leader',
    level: 2,
    avatarInitial: 'H',
    vendorId: 'v-north',
    vendorName: 'North Region Hub',
    reportsToId: 'usr-001',
    reportsToName: 'Arjun Mehta',
    permissions: {
      canOnboardVehicles: true,
      canOnboardDrivers: true,
      canHoldVehicles: true,
      canApproveCompliance: true,
      canDelegatePermissions: true,
      canOverrideSubVendors: false,
      canViewAllRegions: false,
    },
  },
  {
    id: 'usr-003',
    name: 'Gurjeet Kaur',
    email: 'gurjeet.k@punjabfleet.in',
    phone: '+91 98100 00003',
    roleId: 'city_vendor',
    roleTitle: 'City Operations Lead (Punjab)',
    levelBadge: 'L3 · City Vendor',
    level: 3,
    avatarInitial: 'G',
    vendorId: 'v-punjab',
    vendorName: 'Punjab State Fleet',
    reportsToId: 'usr-002',
    reportsToName: 'Harpreet Singh',
    permissions: {
      canOnboardVehicles: true,
      canOnboardDrivers: true,
      canHoldVehicles: true,
      canApproveCompliance: false,
      canDelegatePermissions: false,
      canOverrideSubVendors: false,
      canViewAllRegions: false,
    },
  },
  {
    id: 'usr-004',
    name: 'Manpreet Gill',
    email: 'manpreet@amritsarcabs.in',
    phone: '+91 98100 00010',
    roleId: 'local_vendor',
    roleTitle: 'Local Fleet Operator (Amritsar)',
    levelBadge: 'L4 · Local Vendor',
    level: 4,
    avatarInitial: 'M',
    vendorId: 'v-amritsar',
    vendorName: 'Amritsar Local Fleet',
    reportsToId: 'usr-003',
    reportsToName: 'Gurjeet Kaur',
    permissions: {
      canOnboardVehicles: true,
      canOnboardDrivers: true,
      canHoldVehicles: false,
      canApproveCompliance: false,
      canDelegatePermissions: false,
      canOverrideSubVendors: false,
      canViewAllRegions: false,
    },
  },
  {
    id: 'usr-005',
    name: 'Raj Kumar',
    email: 'raj.kumar.cabs@gmail.com',
    phone: '+91 98201 11001',
    roleId: 'driver',
    roleTitle: 'Commercial Fleet Driver (PB10AB1234)',
    levelBadge: 'L5 · Commercial Driver',
    level: 5,
    avatarInitial: 'R',
    vendorId: 'v-punjab',
    vendorName: 'Punjab State Fleet',
    reportsToId: 'usr-003',
    reportsToName: 'Gurjeet Kaur',
    permissions: {
      canOnboardVehicles: false,
      canOnboardDrivers: false,
      canHoldVehicles: false,
      canApproveCompliance: false,
      canDelegatePermissions: false,
      canOverrideSubVendors: false,
      canViewAllRegions: false,
    },
  },
];

// ─── Fleet / Vehicles ──────────────────────────────────────────────────────

export type FuelType = 'CNG' | 'EV' | 'Diesel' | 'Petrol';
export type VehicleStatus = 'Active' | 'Hold' | 'Maintenance' | 'Decommissioned';
export type ComplianceStatus = 'Valid' | 'Expiring Soon' | 'Expired';

export interface Vehicle {
  id: string;
  plate: string;
  model: string;
  fuelType: FuelType;
  vendorId: string;
  vendorName: string;
  driverId: string | null;
  driverName: string | null;
  status: VehicleStatus;
  compliance: ComplianceStatus;
  insuranceExpiry: string;
  rcExpiry: string;
  permitExpiry: string;
  registeredAt: string;
}

export const VEHICLES: Vehicle[] = [
  { id: 'cab-001', plate: 'PB10AB1234', model: 'Maruti Dzire Tour',    fuelType: 'CNG',    vendorId: 'v-punjab',    vendorName: 'Punjab State Fleet',  driverId: 'drv-001', driverName: 'Raj Kumar',     status: 'Active',      compliance: 'Expiring Soon', insuranceExpiry: '2026-10-05', rcExpiry: '2028-03-15', permitExpiry: '2027-06-01', registeredAt: '2023-06-01' },
  { id: 'cab-002', plate: 'PB08CD4521', model: 'Hyundai Aura S',       fuelType: 'CNG',    vendorId: 'v-amritsar',  vendorName: 'Amritsar Local Fleet', driverId: 'drv-002', driverName: 'Aman Singh',    status: 'Active',      compliance: 'Valid',         insuranceExpiry: '2027-04-20', rcExpiry: '2029-01-01', permitExpiry: '2027-09-15', registeredAt: '2023-07-10' },
  { id: 'cab-003', plate: 'HR26EF9081', model: 'Toyota Innova Crysta', fuelType: 'Diesel', vendorId: 'v-haryana',   vendorName: 'Haryana Transit',      driverId: 'drv-003', driverName: 'Vikram Sharma', status: 'Hold',        compliance: 'Expired',       insuranceExpiry: '2026-09-18', rcExpiry: '2027-08-20', permitExpiry: '2026-09-10', registeredAt: '2022-11-05' },
  { id: 'cab-004', plate: 'KA01MG5678', model: 'Tata Tigor EV',        fuelType: 'EV',     vendorId: 'v-karnataka', vendorName: 'Karnataka Fleet',      driverId: 'drv-004', driverName: 'Deepak Rao',    status: 'Active',      compliance: 'Valid',         insuranceExpiry: '2027-11-30', rcExpiry: '2028-06-10', permitExpiry: '2028-01-20', registeredAt: '2023-08-01' },
  { id: 'cab-005', plate: 'PB10XY9900', model: 'Suzuki Ertiga',        fuelType: 'CNG',    vendorId: 'v-punjab',    vendorName: 'Punjab State Fleet',  driverId: null,      driverName: null,            status: 'Maintenance', compliance: 'Valid',         insuranceExpiry: '2027-07-12', rcExpiry: '2028-04-05', permitExpiry: '2027-08-30', registeredAt: '2023-09-15' },
  { id: 'cab-006', plate: 'DL05AB2211', model: 'Maruti Swift Dzire',   fuelType: 'CNG',    vendorId: 'v-root',      vendorName: 'Super Vendor (India)',driverId: 'drv-005', driverName: 'Suresh Gupta',  status: 'Active',      compliance: 'Valid',         insuranceExpiry: '2027-02-28', rcExpiry: '2028-10-10', permitExpiry: '2027-05-01', registeredAt: '2023-10-01' },
  { id: 'cab-007', plate: 'TS09GH3344', model: 'Honda Amaze',          fuelType: 'Petrol', vendorId: 'v-telangana', vendorName: 'Telangana Cabs',       driverId: 'drv-006', driverName: 'Ravi Shankar',  status: 'Hold',        compliance: 'Expiring Soon', insuranceExpiry: '2026-10-12', rcExpiry: '2027-12-01', permitExpiry: '2026-10-20', registeredAt: '2022-12-20' },
  { id: 'cab-008', plate: 'KA03ZZ8899', model: 'Tata Nexon EV',        fuelType: 'EV',     vendorId: 'v-karnataka', vendorName: 'Karnataka Fleet',      driverId: null,      driverName: null,            status: 'Active',      compliance: 'Valid',         insuranceExpiry: '2028-01-15', rcExpiry: '2029-03-20', permitExpiry: '2028-06-10', registeredAt: '2023-11-01' },
];

// ─── Drivers ───────────────────────────────────────────────────────────────

export type DriverStatus = 'Active' | 'Suspended' | 'Pending KYC' | 'Inactive';

export interface Driver {
  id: string;
  name: string;
  phone: string;
  licenseNo: string;
  licenseExpiry: string;
  vendorId: string;
  vendorName: string;
  assignedVehicleId: string | null;
  assignedPlate: string | null;
  status: DriverStatus;
  kycVerified: boolean;
  joinedAt: string;
}

export const DRIVERS: Driver[] = [
  { id: 'drv-001', name: 'Raj Kumar',     phone: '+91 98201 11001', licenseNo: 'PB-0120-2018-0001', licenseExpiry: '2028-06-15', vendorId: 'v-punjab',    vendorName: 'Punjab State Fleet',  assignedVehicleId: 'cab-001', assignedPlate: 'PB10AB1234', status: 'Active',      kycVerified: true,  joinedAt: '2023-06-05' },
  { id: 'drv-002', name: 'Aman Singh',    phone: '+91 98201 11002', licenseNo: 'PB-0820-2019-0042', licenseExpiry: '2029-03-20', vendorId: 'v-amritsar',  vendorName: 'Amritsar Local Fleet', assignedVehicleId: 'cab-002', assignedPlate: 'PB08CD4521', status: 'Active',      kycVerified: true,  joinedAt: '2023-07-12' },
  { id: 'drv-003', name: 'Vikram Sharma', phone: '+91 98201 11003', licenseNo: 'HR-2620-2017-0088', licenseExpiry: '2027-08-10', vendorId: 'v-haryana',   vendorName: 'Haryana Transit',      assignedVehicleId: 'cab-003', assignedPlate: 'HR26EF9081', status: 'Suspended',   kycVerified: true,  joinedAt: '2022-11-10' },
  { id: 'drv-004', name: 'Deepak Rao',    phone: '+91 98201 11004', licenseNo: 'KA-0120-2020-0210', licenseExpiry: '2030-01-05', vendorId: 'v-karnataka', vendorName: 'Karnataka Fleet',      assignedVehicleId: 'cab-004', assignedPlate: 'KA01MG5678', status: 'Active',      kycVerified: true,  joinedAt: '2023-08-03' },
  { id: 'drv-005', name: 'Suresh Gupta',  phone: '+91 98201 11005', licenseNo: 'DL-0520-2016-0331', licenseExpiry: '2026-11-20', vendorId: 'v-root',      vendorName: 'Super Vendor (India)',assignedVehicleId: 'cab-006', assignedPlate: 'DL05AB2211', status: 'Active',      kycVerified: true,  joinedAt: '2023-10-05' },
  { id: 'drv-006', name: 'Ravi Shankar',  phone: '+91 98201 11006', licenseNo: 'TS-0920-2021-0095', licenseExpiry: '2031-04-10', vendorId: 'v-telangana', vendorName: 'Telangana Cabs',       assignedVehicleId: 'cab-007', assignedPlate: 'TS09GH3344', status: 'Active',      kycVerified: true,  joinedAt: '2022-12-22' },
  { id: 'drv-007', name: 'Priya Sharma',  phone: '+91 98201 11007', licenseNo: 'KA-0320-2022-0441', licenseExpiry: '2032-07-15', vendorId: 'v-karnataka', vendorName: 'Karnataka Fleet',      assignedVehicleId: null,      assignedPlate: null,         status: 'Pending KYC', kycVerified: false, joinedAt: '2023-12-01' },
  { id: 'drv-008', name: 'Navjot Sidhu',  phone: '+91 98201 11008', licenseNo: 'PB-1020-2019-0502', licenseExpiry: '2029-09-30', vendorId: 'v-amritsar',  vendorName: 'Amritsar Local Fleet', assignedVehicleId: null,      assignedPlate: null,         status: 'Active',      kycVerified: true,  joinedAt: '2023-05-14' },
];

// ─── Compliance Documents ──────────────────────────────────────────────────

export type DocType = 'Insurance' | 'RC' | 'Permit' | 'Driving License' | 'PUC';
export type DocStatus = 'Valid' | 'Expiring Soon' | 'Expired' | 'Pending Approval';

export interface ComplianceDoc {
  id: string;
  docType: DocType;
  entityType: 'Vehicle' | 'Driver';
  entityId: string;
  entityName: string;
  vendorId: string;
  vendorName: string;
  expiryDate: string;
  daysLeft: number;
  status: DocStatus;
  fileName?: string;
  uploadedAt?: string;
  uploadedBy?: string;
}

export const COMPLIANCE_DOCS: ComplianceDoc[] = [
  { id: 'doc-001', docType: 'Insurance',        entityType: 'Vehicle', entityId: 'cab-001', entityName: 'PB10AB1234 · Maruti Dzire',    vendorId: 'v-punjab',    vendorName: 'Punjab State Fleet',  expiryDate: '2026-10-05', daysLeft: 12,  status: 'Expiring Soon', fileName: 'dzire_insurance_2026.pdf', uploadedAt: '2025-10-05', uploadedBy: 'Gurjeet Kaur' },
  { id: 'doc-002', docType: 'Insurance',        entityType: 'Vehicle', entityId: 'cab-003', entityName: 'HR26EF9081 · Innova Crysta',   vendorId: 'v-haryana',   vendorName: 'Haryana Transit',      expiryDate: '2026-09-18', daysLeft: -5,  status: 'Expired', fileName: 'innova_policy_expired.pdf', uploadedAt: '2025-09-18', uploadedBy: 'Rahul Verma' },
  { id: 'doc-003', docType: 'Permit',           entityType: 'Vehicle', entityId: 'cab-003', entityName: 'HR26EF9081 · Innova Crysta',   vendorId: 'v-haryana',   vendorName: 'Haryana Transit',      expiryDate: '2026-09-10', daysLeft: -13, status: 'Expired', fileName: 'haryana_stage_permit.pdf', uploadedAt: '2024-09-10', uploadedBy: 'Rahul Verma' },
  { id: 'doc-004', docType: 'Insurance',        entityType: 'Vehicle', entityId: 'cab-007', entityName: 'TS09GH3344 · Honda Amaze',     vendorId: 'v-telangana', vendorName: 'Telangana Cabs',       expiryDate: '2026-10-12', daysLeft: 19,  status: 'Expiring Soon', fileName: 'amaze_comprehensive_ts.pdf', uploadedAt: '2025-10-12', uploadedBy: 'Srinivas Reddy' },
  { id: 'doc-005', docType: 'Permit',           entityType: 'Vehicle', entityId: 'cab-007', entityName: 'TS09GH3344 · Honda Amaze',     vendorId: 'v-telangana', vendorName: 'Telangana Cabs',       expiryDate: '2026-10-20', daysLeft: 27,  status: 'Expiring Soon', fileName: 'telangana_permit_commercial.pdf', uploadedAt: '2025-10-20', uploadedBy: 'Srinivas Reddy' },
  { id: 'doc-006', docType: 'RC',               entityType: 'Vehicle', entityId: 'cab-001', entityName: 'PB10AB1234 · Maruti Dzire',    vendorId: 'v-punjab',    vendorName: 'Punjab State Fleet',  expiryDate: '2028-03-15', daysLeft: 538, status: 'Valid', fileName: 'rc_smartcard_pb10ab.pdf', uploadedAt: '2023-06-01', uploadedBy: 'Gurjeet Kaur' },
  { id: 'doc-007', docType: 'Driving License',  entityType: 'Driver',  entityId: 'drv-005', entityName: 'Suresh Gupta',                 vendorId: 'v-root',      vendorName: 'Super Vendor (India)',expiryDate: '2026-11-20', daysLeft: 58,  status: 'Expiring Soon', fileName: 'dl_suresh_commercial.pdf', uploadedAt: '2023-10-05', uploadedBy: 'Arjun Mehta' },
  { id: 'doc-008', docType: 'PUC',              entityType: 'Vehicle', entityId: 'cab-002', entityName: 'PB08CD4521 · Hyundai Aura',   vendorId: 'v-amritsar',  vendorName: 'Amritsar Local Fleet', expiryDate: '2027-04-20', daysLeft: 209, status: 'Valid', fileName: 'puc_online_test_pb08.pdf', uploadedAt: '2026-04-20', uploadedBy: 'Manpreet Gill' },
  { id: 'doc-009', docType: 'Insurance',        entityType: 'Vehicle', entityId: 'cab-004', entityName: 'KA01MG5678 · Tata Tigor EV',  vendorId: 'v-karnataka', vendorName: 'Karnataka Fleet',      expiryDate: '2027-11-30', daysLeft: 432, status: 'Valid', fileName: 'digit_ev_insurance.pdf', uploadedAt: '2023-08-01', uploadedBy: 'Deepak Rao' },
  { id: 'doc-010', docType: 'Driving License',  entityType: 'Driver',  entityId: 'drv-003', entityName: 'Vikram Sharma',                vendorId: 'v-haryana',   vendorName: 'Haryana Transit',      expiryDate: '2027-08-10', daysLeft: 321, status: 'Valid', fileName: 'hr_dl_commercial_badge.pdf', uploadedAt: '2022-11-10', uploadedBy: 'Rahul Verma' },
  { id: 'doc-011', docType: 'RC',               entityType: 'Vehicle', entityId: 'cab-002', entityName: 'PB08CD4521 · Hyundai Aura',   vendorId: 'v-amritsar',  vendorName: 'Amritsar Local Fleet', expiryDate: '2029-01-01', daysLeft: 830, status: 'Pending Approval', fileName: 'rc_renewal_upload.pdf', uploadedAt: '2026-09-23', uploadedBy: 'Manpreet Gill' },
];

// ─── Activity Feed ─────────────────────────────────────────────────────────

export interface ActivityEvent {
  id: string;
  type: 'vehicle_added' | 'driver_added' | 'compliance_hold' | 'permission_changed' | 'vendor_suspended' | 'document_uploaded';
  message: string;
  actor: string;
  vendorName: string;
  timestamp: string;
}

export const ACTIVITY_FEED: ActivityEvent[] = [
  { id: 'act-001', type: 'compliance_hold',    message: 'HR26EF9081 placed on compliance hold — insurance expired',     actor: 'System Auto-Audit',vendorName: 'Haryana Transit',     timestamp: '2026-09-23T08:14:00Z' },
  { id: 'act-002', type: 'driver_added',       message: 'Driver Priya Sharma onboarded — KYC pending verification',     actor: 'Deepak Rao',       vendorName: 'Karnataka Fleet',     timestamp: '2026-09-23T07:41:00Z' },
  { id: 'act-003', type: 'permission_changed', message: 'Punjab Regional Fleet: Disable Vehicle permission revoked',     actor: 'Arjun Mehta',      vendorName: 'Super Vendor (India)',timestamp: '2026-09-22T19:05:00Z' },
  { id: 'act-004', type: 'vehicle_added',      message: 'KA03ZZ8899 (Tata Nexon EV) registered to Karnataka Fleet',     actor: 'Priya Nair',       vendorName: 'Karnataka Fleet',     timestamp: '2026-09-22T16:30:00Z' },
  { id: 'act-005', type: 'vendor_suspended',   message: 'Telangana Cabs suspended — compliance audit initiated',         actor: 'Arjun Mehta',      vendorName: 'Super Vendor (India)',timestamp: '2026-09-22T11:20:00Z' },
  { id: 'act-006', type: 'document_uploaded',  message: 'PB08CD4521 RC renewal submitted — pending audit verification',  actor: 'Manpreet Gill',    vendorName: 'Amritsar Local Fleet', timestamp: '2026-09-23T09:12:00Z' },
];

// ─── KPI Summary ───────────────────────────────────────────────────────────

export const DASHBOARD_KPIS = {
  activeVendors: 7,
  activeVehicles: 850,
  activeDrivers: 921,
  complianceRate: 96,
  expiringSoon: 34,
  expired: 12,
  pendingKyc: 1,
  pendingApproval: 1,
};
