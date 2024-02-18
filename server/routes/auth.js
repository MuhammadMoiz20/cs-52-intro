const rateLimit = require('../middleware/ratelimit');
const router = require('express').Router();
router.use(rateLimit(5, 60_000));
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET = process.env.JWT_SECRET || 'devsecret';

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'missing' });
  if (password.length < 6) return res.status(400).json({ error: 'password too short' });
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ error: 'email taken' });
  const passwordHash = await bcrypt.hash(password, 10);
  const u = await User.create({ email, passwordHash });
  const token = jwt.sign({ id: u._id }, SECRET);
  res.json({ token });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const u = await User.findOne({ email });
  if (!u) return res.status(401).json({ error: 'bad creds' });
  const ok = await bcrypt.compare(password, u.passwordHash);
  if (!ok) return res.status(401).json({ error: 'bad creds' });
  const token = jwt.sign({ id: u._id }, SECRET);
  res.json({ token });
});

module.exports = router;
