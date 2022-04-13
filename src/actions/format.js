const getPercentage = (partial, total) => {
  const round = (value, precision) => {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  };
  return round((100 * partial) / total);
};

const removeTags = (str) => {
  if (str === null || str === "") return false;
  else str = str.toString();
  return str.replace(/(<([^>]+)>)/gi, "");
};

export { getPercentage, removeTags };
