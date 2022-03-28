/**
 * Utility functions for formatting purposes
 */

export const formatToRupiahCurrency = (value: number, noSymbol = false): string => {
  if (noSymbol) {
    return `${value.toLocaleString('id')}`;
  }
  return `Rp ${value.toLocaleString('id')}`;
};

export const formatToDollarCurrency = (value: number, noSymbol = false): string => {
  if (noSymbol) {
    return `${value.toLocaleString('en')}`;
  }
  return `$ ${value.toLocaleString('en')}`;
};
