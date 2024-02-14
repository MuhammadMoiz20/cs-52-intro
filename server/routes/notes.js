const router = require('express').Router();
const Note = require('../models/Note');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page || '1', 10);
  const limit = 20;
  const notes = await Note.find({ user: req.userId })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  res.json(notes);
});

router.post('/', async (req, res) => {
  const text = (req.body.text || '').trim();
  if (!text) return res.status(400).json({ error: 'text required' });
  if (text.length > 500) return res.status(400).json({ error: 'too long' });
  const n = await Note.create({ text, user: req.userId });
  res.json(n);
});

router.put('/:id', async (req, res) => {
  const text = (req.body.text || '').trim();
  if (!text) return res.status(400).json({ error: 'text required' });
  const n = await Note.findOneAndUpdate({ _id: req.params.id, user: req.userId }, { text }, { new: true });
  res.json(n);
});

router.delete('/:id', async (req, res) => {
  await Note.findOneAndDelete({ _id: req.params.id, user: req.userId });
  res.json({ ok: true });
});

module.exports = router;
