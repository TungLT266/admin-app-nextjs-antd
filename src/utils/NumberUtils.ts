export const formatNumber = (value: number | undefined | null) => {
  if (value == null) return "";
  return value.toLocaleString("en-EN");
};
