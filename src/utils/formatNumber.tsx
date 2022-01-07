export const formatNumber = (value: number | string, digits: number): number => {
  const formatToNumber = Number(value);
  return Number.isNaN(formatToNumber) ? 0 : parseFloat(formatToNumber.toFixed(digits));
};

export const formatNumberDot: (value: number) => string | number = (value) => {
  try {
    return value.toLocaleString();
  } catch (error) {
    return value;
  }
};

export const getNumberUnit = (value: number): { unit: string; formatNum: number } => {
  if (value >= 1000000) {
    return { unit: 'm', formatNum: value / 1000000 };
  }
  if (value >= 1000) {
    return { unit: 'k', formatNum: value / 1000 };
  }
  return { unit: '', formatNum: value };
};

export const getNumberWithUnit = (number: number) => {
  const { unit, formatNum } = getNumberUnit(number);
  return `${formatNumberDot(formatNum)}${unit}`;
};
