exports.isEmailValid = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

exports.isPasswordStrong = (password) => {
  return password.length >= 6;
};