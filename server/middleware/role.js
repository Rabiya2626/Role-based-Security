module.exports = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.type)) {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};
