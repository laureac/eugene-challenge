import moment from "moment";

export const useDate = (startDate: string, endDate: string): ReturnDate => {
  // formatting the data using moment.js
  const date = moment(startDate).format("MMM Do YY");
  const time = moment(startDate).format("h:mm a");

  const start = moment(startDate);
  const end = moment(endDate);
  const duration = end.diff(start, "minutes");

  return {
    date,
    time,
    duration,
  };
};

interface ReturnDate {
  time: string;
  date: string;
  duration: number;
}
