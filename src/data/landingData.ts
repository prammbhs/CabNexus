export interface StatItem {
  label: string;
  value: string;
  change?: string;
}

export interface ProblemCard {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  badge: string;
  iconName: string;
  metric?: string;
}

export interface HierarchyNode {
  id: string;
  name: string;
  role: string;
  level: string;
  vehicles: number;
  drivers: number;
  complianceRate: string;
  children?: HierarchyNode[];
}

export interface PermissionCategory {
  category: string;
  permissions: {
    id: string;
    label: string;
    checked: boolean;
  }[];
}

export interface FleetVehiclePreview {
  plate: string;
  model: string;
  driver: string;
  vendor: string;
  status: 'Active' | 'Hold' | 'Maintenance';
  fuelType: 'CNG' | 'Diesel' | 'EV' | 'Petrol';
  compliance: 'Valid' | 'Expiring Soon' | 'Expired';
}

export interface WorkflowStep {
  stepNumber: string;
  title: string;
  description: string;
}

export const HERO_STATS: StatItem[] = [
  { label: 'Active Vendors', value: '42' },
  { label: 'Cabs Onboarded', value: '850' },
  { label: 'Verified Drivers', value: '920' },
  { label: 'Fleet Compliance', value: '96%' },
];

export const CAPABILITY_PILLS = [
  'N-Level Vendor Hierarchy',
  'Role-Based Access (RBAC)',
  'Fleet Compliance Tracking',
  'Centralized Operations',
];

export const PROBLEM_CARDS: ProblemCard[] = [
  {
    id: 'multiple-vendors',
    title: 'Multiple Vendors',
    description: 'Managing regional and local vendors becomes chaotic as operations expand without a unified structure.',
    iconName: 'Building2',
  },
  {
    id: 'scattered-fleet',
    title: 'Scattered Fleet Data',
    description: 'Vehicles and drivers are distributed across disparate spreadsheets, leading to double-allocation and blindspots.',
    iconName: 'Car',
  },
  {
    id: 'compliance-risk',
    title: 'Compliance Risk',
    description: 'Expired licenses, RCs, permits, and pollution certificates disrupt daily dispatch and trigger heavy penalties.',
    iconName: 'AlertTriangle',
  },
  {
    id: 'limited-visibility',
    title: 'Limited Visibility',
    description: 'Super Vendors lack real-time visibility and central override controls across sub-vendor branches.',
    iconName: 'EyeOff',
  },
];

export const FEATURES: FeatureItem[] = [
  {
    id: 'vendor-hierarchy',
    title: 'Vendor Hierarchy',
    description: 'Manage regional, city, and local vendors through an arbitrary-depth N-level tree with parent-child scoping.',
    badge: 'Multi-Tier',
    iconName: 'GitBranch',
    metric: 'N-Tier Depth',
  },
  {
    id: 'fleet-management',
    title: 'Fleet Management',
    description: 'Onboard, inspect, categorize fuel types, and monitor cabs across your entire geographic network.',
    badge: 'Operations',
    iconName: 'Car',
    metric: '100% Tracking',
  },
  {
    id: 'driver-management',
    title: 'Driver Management',
    description: 'Verify licenses, police clearance certificates, and assign drivers to vehicles without allocation conflicts.',
    badge: 'KYC & Safety',
    iconName: 'Users',
    metric: 'Conflict-Free',
  },
  {
    id: 'permission-management',
    title: 'Permission Management',
    description: 'Grant or delegate granular capabilities to sub-vendors with optional expiration dates and instant revocation.',
    badge: 'RBAC',
    iconName: 'ShieldCheck',
    metric: 'Role-Scoped',
  },
  {
    id: 'compliance-tracking',
    title: 'Compliance Tracking',
    description: 'Real-time rule engine proactively monitors 30-day document windows and automatically halts non-compliant cabs.',
    badge: 'Automated',
    iconName: 'FileCheck',
    metric: '30-Day Window',
  },
  {
    id: 'centralized-control',
    title: 'Centralized Control',
    description: 'Super Vendors maintain global oversight with one-click operational overrides, holds, and activity logs.',
    badge: 'Governance',
    iconName: 'LayoutDashboard',
    metric: 'Total Control',
  },
];

export const VENDOR_TREE_DATA: HierarchyNode = {
  id: 'v-root',
  name: 'Super Vendor India Operations',
  role: 'Super Vendor (Root)',
  level: 'Level 1',
  vehicles: 850,
  drivers: 920,
  complianceRate: '96%',
  children: [
    {
      id: 'v-north',
      name: 'North Region Hub',
      role: 'Regional Vendor',
      level: 'Level 2',
      vehicles: 490,
      drivers: 530,
      complianceRate: '97%',
      children: [
        {
          id: 'v-punjab',
          name: 'Punjab State Fleet',
          role: 'State / City Vendor',
          level: 'Level 3',
          vehicles: 248,
          drivers: 270,
          complianceRate: '95%',
          children: [
            {
              id: 'v-amritsar',
              name: 'Amritsar Local Fleet',
              role: 'Local Vendor',
              level: 'Level 4',
              vehicles: 110,
              drivers: 120,
              complianceRate: '98%',
            },
            {
              id: 'v-ludhiana',
              name: 'Ludhiana Express',
              role: 'Local Vendor',
              level: 'Level 4',
              vehicles: 138,
              drivers: 150,
              complianceRate: '93%',
            },
          ],
        },
        {
          id: 'v-haryana',
          name: 'Haryana Transit Fleet',
          role: 'State / City Vendor',
          level: 'Level 3',
          vehicles: 242,
          drivers: 260,
          complianceRate: '98%',
        },
      ],
    },
    {
      id: 'v-south',
      name: 'South Region Hub',
      role: 'Regional Vendor',
      level: 'Level 2',
      vehicles: 360,
      drivers: 390,
      complianceRate: '95%',
      children: [
        {
          id: 'v-karnataka',
          name: 'Karnataka Fleet',
          role: 'State / City Vendor',
          level: 'Level 3',
          vehicles: 210,
          drivers: 225,
          complianceRate: '96%',
        },
        {
          id: 'v-telangana',
          name: 'Telangana Mobility',
          role: 'State / City Vendor',
          level: 'Level 3',
          vehicles: 150,
          drivers: 165,
          complianceRate: '94%',
        },
      ],
    },
  ],
};

export const INITIAL_PERMISSION_CATEGORIES: PermissionCategory[] = [
  {
    category: 'Fleet Management',
    permissions: [
      { id: 'fleet-add', label: 'Add Vehicle', checked: true },
      { id: 'fleet-edit', label: 'Edit Vehicle', checked: true },
      { id: 'fleet-assign', label: 'Assign Vehicle', checked: true },
      { id: 'fleet-disable', label: 'Disable Vehicle', checked: false },
    ],
  },
  {
    category: 'Driver Management',
    permissions: [
      { id: 'driver-add', label: 'Add Driver', checked: true },
      { id: 'driver-verify', label: 'Verify Credentials', checked: true },
      { id: 'driver-assign', label: 'Assign to Cab', checked: true },
      { id: 'driver-suspend', label: 'Suspend Driver', checked: false },
    ],
  },
  {
    category: 'Compliance & Verification',
    permissions: [
      { id: 'comp-view', label: 'View Documents', checked: true },
      { id: 'comp-upload', label: 'Upload Documents', checked: true },
      { id: 'comp-verify', label: 'Verify Documents', checked: true },
    ],
  },
  {
    category: 'Bookings & Dispatch',
    permissions: [
      { id: 'book-manage', label: 'Manage Bookings', checked: true },
    ],
  },
  {
    category: 'Financial Operations',
    permissions: [
      { id: 'pay-view', label: 'View Payouts', checked: false },
      { id: 'pay-process', label: 'Process Payments', checked: false },
    ],
  },
];

export const COMPLIANCE_METRICS = {
  overallScore: '96%',
  validCount: 912,
  expiringSoonCount: 34,
  expiredCount: 12,
  missingCount: 8,
};

export const SAMPLE_DOCUMENTS = [
  { name: 'Commercial Driving License', entity: 'Raj Kumar (Driver)', status: 'Valid', expiry: '18 Nov 2028', type: 'Driver' },
  { name: 'Comprehensive Vehicle Insurance', entity: 'PB10AB1234 (Maruti Dzire)', status: 'Expiring Soon', expiry: 'In 12 Days', type: 'Vehicle' },
  { name: 'Registration Certificate (RC)', entity: 'HR26EF9081 (Innova Crysta)', status: 'Expired', expiry: '5 Days Ago', type: 'Vehicle' },
  { name: 'State Commercial Road Permit', entity: 'PB08CD4521 (Hyundai Aura)', status: 'Valid', expiry: '24 Sep 2027', type: 'Vehicle' },
];

export const FLEET_PREVIEW_ROWS: FleetVehiclePreview[] = [
  {
    plate: 'PB10AB1234',
    model: 'Maruti Dzire Tour',
    driver: 'Raj Kumar',
    vendor: 'Punjab State Fleet',
    status: 'Active',
    fuelType: 'CNG',
    compliance: 'Expiring Soon',
  },
  {
    plate: 'PB08CD4521',
    model: 'Hyundai Aura S',
    driver: 'Aman Singh',
    vendor: 'Amritsar Local Fleet',
    status: 'Active',
    fuelType: 'CNG',
    compliance: 'Valid',
  },
  {
    plate: 'HR26EF9081',
    model: 'Toyota Innova Crysta',
    driver: 'Vikram Sharma',
    vendor: 'Haryana Transit',
    status: 'Hold',
    fuelType: 'Diesel',
    compliance: 'Expired',
  },
  {
    plate: 'KA01MG5678',
    model: 'Tata Tigor EV',
    driver: 'Deepak Rao',
    vendor: 'Karnataka Fleet',
    status: 'Active',
    fuelType: 'EV',
    compliance: 'Valid',
  },
];

export const HOW_IT_WORKS_STEPS: WorkflowStep[] = [
  {
    stepNumber: '01',
    title: 'Create Vendors',
    description: 'Register regional, city, and local fleets with clear operational scopes and contact credentials.',
  },
  {
    stepNumber: '02',
    title: 'Build Your Hierarchy',
    description: 'Map child nodes under regional hubs to establish transparent lines of authority and data isolation.',
  },
  {
    stepNumber: '03',
    title: 'Onboard Vehicles & Drivers',
    description: 'Upload RC, insurance, driving licenses, and link drivers to compliant vehicles with zero double-booking.',
  },
  {
    stepNumber: '04',
    title: 'Delegate Permissions',
    description: 'Grant granular operational authority with optional expiration dates and immediate audit tracing.',
  },
  {
    stepNumber: '05',
    title: 'Monitor Compliance',
    description: 'Track 30-day expiry windows in real time with automated holds preventing non-compliant dispatch.',
  },
];
