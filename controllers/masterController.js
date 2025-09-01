// controllers/masterController.js
const Master = require('../models/master');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { username, password } = req.body;
  if (Master.findByUsername(username)) {
    return res.status(400).json({ message: 'Username già esistente' });
  }
  const master = await Master.create(username, password);
  res.json({ message: 'Master registrato', username: master.username });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const master = Master.findByUsername(username);
  if (!master) return res.status(400).json({ message: 'Master non trovato' });

  const valid = await master.comparePassword(password);
  if (!valid) return res.status(400).json({ message: 'Password errata' });

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ message: 'Login effettuato', token });
};

module.exports = { register, login };
