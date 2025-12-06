export type UserRole = 'user' | 'admin' | 'superUser';

export interface User {
  id: string;
  ci: string;
  firstName: string;
  lastName: string;
  address: string;
  roles: UserRole[];
  profilePictureUrl: string | null;
}
