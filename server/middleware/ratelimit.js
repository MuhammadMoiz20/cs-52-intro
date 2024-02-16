// simple in-memory rate limit, per ip
const hits = new Map();

module.exports = function (max, windowMs) {
  return function (req, res, next) {
    const ip = req.ip;
    const now = Date.now();
    const arr = (hits.get(ip) || []).filter(t => now - t < windowMs);
    arr.push(now);
    hits.set(ip, arr);
    if (arr.length > max) return res.status(429).json({ error: 'slow down' });
    next();
  };
};
