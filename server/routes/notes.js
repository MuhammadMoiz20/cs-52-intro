const router = require('express').Router();
const Note = require('../models/Note');

router.get('/', async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 });
  res.json(notes);
});

router.post('/', async (req, res) => {
  const n = await Note.create({ text: req.body.text || '' });
  res.json(n);
});

router.delete('/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
