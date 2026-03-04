export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export const UserStatusLabels = [
  { value: UserStatus.ACTIVE, label: "Active" },
  { value: UserStatus.INACTIVE, label: "Inactive" },
];

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export const UserRoleLabels = [
  { value: UserRole.ADMIN, label: "Admin" },
  { value: UserRole.USER, label: "User" },
];
