const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token mancante' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token non valido' });
  }
}

function ensureMaster(req, res, next) {
  if (req.user?.role !== 'master') {
    return res.status(403).json({ error: 'Accesso riservato al master' });
  }
  next();
}

module.exports = { authMiddleware, ensureMaster };
