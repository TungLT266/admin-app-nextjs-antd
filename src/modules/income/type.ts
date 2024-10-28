export enum IncomeStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
}

export const IncomeStatusLabels = [
  { value: IncomeStatus.PENDING, label: "Pending" },
  { value: IncomeStatus.CONFIRMED, label: "Confirmed" },
];
