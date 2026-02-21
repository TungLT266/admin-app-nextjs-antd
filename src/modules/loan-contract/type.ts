export enum LoanStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
}

export const LoanStatusLabels = [
  { value: LoanStatus.PENDING, label: "Pending", color: "orange" },
  { value: LoanStatus.ACTIVE, label: "Active", color: "blue" },
  { value: LoanStatus.COMPLETED, label: "Completed", color: "green" },
];

export enum LoanType {
  LOAN = "LOAN", // Cho vay – I lend money
  DEBT = "DEBT", // Đi vay – I borrow money
}

export const LoanTypeLabels = [
  { value: LoanType.LOAN, label: "Loan (Cho vay)", color: "cyan" },
  { value: LoanType.DEBT, label: "Debt (Đi vay)", color: "volcano" },
];

export enum LoanTransactionType {
  DISBURSEMENT = "DISBURSEMENT",
  PAYMENT = "PAYMENT",
}

export const LoanTransactionTypeLabels = [
  { value: LoanTransactionType.DISBURSEMENT, label: "Disbursement", color: "blue" },
  { value: LoanTransactionType.PAYMENT, label: "Payment", color: "green" },
];


