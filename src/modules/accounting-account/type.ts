export enum AccountingAccountStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export const AccountingAccountStatusLabels = [
  { key: AccountingAccountStatus.ACTIVE, label: "Hoạt động" },
  { key: AccountingAccountStatus.INACTIVE, label: "Ngừng hoạt động" },
];
