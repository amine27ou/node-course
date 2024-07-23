const jwt = require('jsonwebtoken');

const verifyToken =  (req, res, next) => {
  const authHeader = req.headers['authorization']; 

  if (!authHeader) {
    return res.status(401).json('Token is required');
  }

  const token = authHeader.split(' ')[1]; // Because it starts with "Bearer token"

  if (!token) {
    return res.status(401).json('Token is required');
  }

  try {
    const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.currentUser = currentUser
    next();
  } catch (err) {
    return res.status(401).json('Invalid token');
  }
};

module.exports = verifyToken;
