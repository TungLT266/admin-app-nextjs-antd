export enum FunctionType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
  LOCAL_TRANSFER = 'LOCAL_TRANSFER',
}

export const FunctionTypeLabels = [
  { value: FunctionType.INCOME, label: "Income" },
  { value: FunctionType.EXPENSE, label: "Expense" },
  { value: FunctionType.LOCAL_TRANSFER, label: "Local Transfer" },
];
