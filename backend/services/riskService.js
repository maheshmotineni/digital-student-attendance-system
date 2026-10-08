exports.predictRisk = (percentage) => {
  if (percentage < 60) return "High Risk";
  if (percentage < 75) return "Medium Risk";
  return "Low Risk";
};