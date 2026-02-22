export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export const UserStatusLabels = [
  { value: UserStatus.ACTIVE, label: "Active" },
  { value: UserStatus.INACTIVE, label: "Inactive" },
];
