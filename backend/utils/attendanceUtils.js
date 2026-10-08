exports.calculatePercentage = (total, present) => {
  if (total === 0) return 0;
  return (present / total) * 100;
};

exports.getAttendanceStatus = (percentage) => {
  if (percentage < 60) return "High Risk";
  if (percentage < 75) return "Medium Risk";
  return "Safe";
};