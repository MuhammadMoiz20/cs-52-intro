const router = require('express').Router();
const notes = [];

router.get('/', (req, res) => res.json(notes));
router.post('/', (req, res) => {
  const n = { id: Date.now(), text: req.body.text || '' };
  notes.push(n);
  res.json(n);
});

module.exports = router;
