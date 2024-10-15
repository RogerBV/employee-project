const BACKENDSERVER = 'http://' + process.env.BACKEND_SERVER + ':'+ process.env.BACKEND_PORT+'/'

import { differenceInYears, differenceInMonths, differenceInDays, subYears, subMonths } from 'date-fns';

const calculateDifference = (isoDate: string) => {
  const currentDate = new Date();
  const targetDate = new Date(isoDate);

  const years = differenceInYears(currentDate, targetDate);

  const dateWithoutYears = subYears(currentDate, years);
  const months = differenceInMonths(dateWithoutYears, targetDate);

  const dateWithoutMonths = subMonths(dateWithoutYears, months);
  const days = differenceInDays(dateWithoutMonths, targetDate);

  return `${years}y – ${months}m – ${days}d`;
};

const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

export { BACKENDSERVER, calculateDifference, formatDate }

