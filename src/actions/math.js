const getPercentage = (partial, total) => {
  const round = (value, precision) => {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  };
  return round((100 * partial) / total);
};

export { getPercentage };
