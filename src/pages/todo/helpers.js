import { DONE, PENDING } from "constants/app";

export const getFormattedData = (data) => {
  const pending = [];
  const done = [];

  data.forEach((item) => {
    if (item.status === PENDING) pending.push(item);
    if (item.status === DONE) done.push(item);
  });

  const formattedData = {
    pending,
    done,
  };

  return formattedData;
};
