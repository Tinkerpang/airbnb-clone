const jwt = require('jsonwebtoken');

// Protects routes by verifying the JWT sent in the Authorization header.
// Expected header format: "Authorization: Bearer <token>"
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, username, role }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Not authorized, token invalid or expired' });
  }
};

// Optional gate for host-only actions (creating/updating/deleting listings)
const requireHost = (req, res, next) => {
  if (req.user && req.user.role === 'host') {
    return next();
  }
  return res.status(403).json({ message: 'Access denied: hosts only' });
};

module.exports = { protect, requireHost };
