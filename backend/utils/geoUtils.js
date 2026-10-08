exports.isWithinCampus = (latitude, longitude) => {
  const campusLat = 17.3850;  // Example
  const campusLng = 78.4867;

  const distance = Math.sqrt(
    Math.pow(latitude - campusLat, 2) +
    Math.pow(longitude - campusLng, 2)
  );

  return distance < 0.01; // Adjust radius
};