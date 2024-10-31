import dayjs from "dayjs";

export const formatDatetime = (datetime: Date | undefined) => {
  if (!datetime) {
    return "";
  }

  return dayjs(datetime).format("YYYY-MM-DD HH:mm:ss");
};

export const formatDate = (datetime: Date | undefined) => {
  if (!datetime) {
    return "";
  }

  return dayjs(datetime).format("YYYY-MM-DD");
};

export const formatDateInputApi = (datetime: Date | undefined) => {
  if (!datetime) {
    return "";
  }

  return dayjs(datetime).format("YYYY-MM-DD");
};
