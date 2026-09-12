import { UserRole } from '@/lib/types';

export type Permission =
  | 'view:cockpit'
  | 'manage:own_business'
  | 'manage:all_businesses'
  | 'create:course'
  | 'enroll:course'
  | 'mentor:offer_session'
  | 'mentor:request_session'
  | 'post:community'
  | 'moderate:community'
  | 'manage:marketplace'
  | 'create:order'
  | 'view:regional_analytics'
  | 'view:admin_panel'
  | 'manage:programs'
  | 'view:investor_pipeline';

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  PLATFORM_SUPER_ADMIN: [
    'view:cockpit',
    'manage:own_business',
    'manage:all_businesses',
    'create:course',
    'enroll:course',
    'mentor:offer_session',
    'mentor:request_session',
    'post:community',
    'moderate:community',
    'manage:marketplace',
    'create:order',
    'view:regional_analytics',
    'view:admin_panel',
    'manage:programs',
    'view:investor_pipeline',
  ],
  KADIN_ADMIN: [
    'view:cockpit',
    'manage:all_businesses',
    'create:course',
    'enroll:course',
    'post:community',
    'moderate:community',
    'view:regional_analytics',
    'view:admin_panel',
    'manage:programs',
    'view:investor_pipeline',
  ],
  REGIONAL_ADMIN: [
    'view:cockpit',
    'post:community',
    'moderate:community',
    'view:regional_analytics',
    'view:admin_panel',
    'manage:programs',
  ],
  COMMUNITY_ADMIN: [
    'view:cockpit',
    'post:community',
    'moderate:community',
    'enroll:course',
  ],
  COMMUNITY_MODERATOR: [
    'view:cockpit',
    'post:community',
    'moderate:community',
  ],
  MENTOR: [
    'view:cockpit',
    'mentor:offer_session',
    'post:community',
    'enroll:course',
  ],
  TRAINER: [
    'view:cockpit',
    'create:course',
    'enroll:course',
    'post:community',
  ],
  PARTNER: [
    'view:cockpit',
    'manage:programs',
    'post:community',
  ],
  UMKM_OWNER: [
    'view:cockpit',
    'manage:own_business',
    'enroll:course',
    'mentor:request_session',
    'post:community',
    'manage:marketplace',
    'create:order',
  ],
  UMKM_STAFF: [
    'view:cockpit',
    'enroll:course',
    'post:community',
    'manage:marketplace',
  ],
  BUYER: [
    'view:cockpit',
    'create:order',
    'post:community',
  ],
  INVESTOR: [
    'view:cockpit',
    'view:investor_pipeline',
    'post:community',
  ],
  FINANCIAL_PARTNER: [
    'view:cockpit',
    'manage:programs',
    'view:investor_pipeline',
  ],
  GOVERNMENT: [
    'view:cockpit',
    'view:regional_analytics',
    'manage:programs',
  ],
  GUEST: [
    'view:cockpit',
  ],
};

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function canAccessAdmin(role: UserRole): boolean {
  return ['PLATFORM_SUPER_ADMIN', 'KADIN_ADMIN', 'REGIONAL_ADMIN', 'GOVERNMENT'].includes(role);
}
