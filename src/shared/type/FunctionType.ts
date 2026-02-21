export enum FunctionType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
  LOCAL_TRANSFER = 'LOCAL_TRANSFER',
  CONTRACT_TRANSACTION = 'CONTRACT_TRANSACTION',
}

export const FunctionTypeLabels = [
  { value: FunctionType.INCOME, label: "Income", color: "green" },
  { value: FunctionType.EXPENSE, label: "Expense", color: "red" },
  { value: FunctionType.LOCAL_TRANSFER, label: "Local Transfer", color: "orange" },
  { value: FunctionType.CONTRACT_TRANSACTION, label: "Contract Transaction", color: "purple" },
];
