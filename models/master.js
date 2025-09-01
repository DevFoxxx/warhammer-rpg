const express = require('express');
const Master = require('../models/master');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const master = Master.findByUsername(username);
  if (!master) return res.status(401).json({ message: 'Master non trovato' });

  const ok = await master.comparePassword(password);
  if (!ok) return res.status(401).json({ message: 'Password errata' });

  res.json({ message: 'Login riuscito' });
});

module.exports = router;
