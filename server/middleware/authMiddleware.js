const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('❌ No valid Authorization header');
    return res.sendStatus(401); // Unauthorized
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attaches user ID to the request
    next();
  } catch (err) {
    console.log('❌ Invalid token');
    return res.sendStatus(403); // Forbidden
  }
}

module.exports = authMiddleware;
