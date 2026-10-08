const roleMiddleware = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(403).json({ msg: "Access denied" });

    const userRole = req.user.role.toLowerCase();
    const allowedRoles = roles.map(r => r.toLowerCase());

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ msg: "Access denied: Unauthorized role" });
    }
    next();
  };
};

module.exports = {roleMiddleware};