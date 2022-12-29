import moment from 'moment';

export const toMoment = (date: string) => {
  const dateSplits = date.split('月');
  const month = parseInt(dateSplits[0]);
  const day = parseInt(dateSplits[1].split('日')[0]);
  return moment(`2023-${month}-${day}`, 'YYYY-M-D');
};
