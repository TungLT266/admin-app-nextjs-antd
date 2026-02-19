export enum AccountingAccountStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export const AccountingAccountStatusLabels = [
  { value: AccountingAccountStatus.ACTIVE, label: "Active" },
  { value: AccountingAccountStatus.INACTIVE, label: "Inactive" },
];

export enum AccountType {
  TYPE_1 = 1,
  TYPE_2 = 2,
  TYPE_3 = 3,
  TYPE_4 = 4,
  TYPE_5 = 5,
  TYPE_6 = 6,
  TYPE_7 = 7,
  TYPE_8 = 8,
  TYPE_9 = 9,
}

export const AccountTypeLabels = [
  { value: AccountType.TYPE_1, label: "Type 1" },
  { value: AccountType.TYPE_2, label: "Type 2" },
  { value: AccountType.TYPE_3, label: "Type 3" },
  { value: AccountType.TYPE_4, label: "Type 4" },
  { value: AccountType.TYPE_5, label: "Type 5" },
  { value: AccountType.TYPE_6, label: "Type 6" },
  { value: AccountType.TYPE_7, label: "Type 7" },
  { value: AccountType.TYPE_8, label: "Type 8" },
  { value: AccountType.TYPE_9, label: "Type 9" },
];
