import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Reject if header is missing or doesn't start with 'Bearer '
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify token using JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach payload (id, email, role) to req.user
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};