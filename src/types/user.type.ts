export type UserRole = "ADMIN" | "SELLER" | "CUSTOMER";
export type UserStatus = "BAN" | "UNBAN";

export interface User {
  id: string;

  name: string;
  email: string;
  phone: string;

  image: string | null;

  emailVerified: boolean;

  role: UserRole;
  status: UserStatus;

  createdAt: string; // ISO date string
  updatedAt: string;
}
