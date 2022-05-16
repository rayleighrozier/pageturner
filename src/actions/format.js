const getPercentage = (partial, total) => {
  const round = (value, precision) => {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  };
  return round((100 * partial) / total);
};

const removeTags = (str) => {
  if (str === null || str === "") return false;
  else
    try {
      str = str.toString();
    } catch (exception) {
      return false;
    }
  return str.replace(/(<([^>]+)>)/gi, "");
};

const formatDate = (date) => {
  const [year, month, day] = date.split("-");
  return [month, day, year].join("/");
};

export { getPercentage, removeTags, formatDate };
