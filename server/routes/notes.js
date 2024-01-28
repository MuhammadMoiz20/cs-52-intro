const router = require('express').Router();
const Note = require('../models/Note');

router.get('/', async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 });
  res.json(notes);
});

router.post('/', async (req, res) => {
  const text = (req.body.text || '').trim();
  if (!text) return res.status(400).json({ error: 'text required' });
  if (text.length > 500) return res.status(400).json({ error: 'too long' });
  const n = await Note.create({ text });
  res.json(n);
});

router.put('/:id', async (req, res) => {
  const text = (req.body.text || '').trim();
  if (!text) return res.status(400).json({ error: 'text required' });
  const n = await Note.findByIdAndUpdate(req.params.id, { text }, { new: true });
  res.json(n);
});

router.delete('/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
