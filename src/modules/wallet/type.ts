export enum WalletType {
  BANK = "BANK",
  CASH = "CASH",
  CREDIT_CARD = "CREDIT_CARD",
  E_WALLET = "E_WALLET",
  SAVING = "SAVING",
}

export const WalletTypeLabels = [
  { value: WalletType.BANK, label: "Bank" },
  { value: WalletType.CASH, label: "Cash" },
  { value: WalletType.CREDIT_CARD, label: "Credit card" },
  { value: WalletType.E_WALLET, label: "E-Wallet" },
  { value: WalletType.SAVING, label: "Saving" },
];
