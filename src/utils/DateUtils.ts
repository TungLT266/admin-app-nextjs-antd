import dayjs from "dayjs";

export const formatDatetime = (datetime: Date) => {
  return dayjs(datetime).format("YYYY-MM-DD HH:mm:ss");
};
