import moment from 'moment';

export const utcConvertLocalDate = (date: string) => {
  const stillUtc = moment.utc(date).toDate();
  const localDate = moment(stillUtc).local();
  return localDate;
};
