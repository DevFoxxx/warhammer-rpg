const Pg = require('../models/pg');

exports.getAll = async (req, res) => {
  const pgs = await Pg.find().populate('playerId campagnaId');
  res.json(pgs);
};

exports.create = async (req, res) => {
  const nuovo = await Pg.create(req.body);
  res.json(nuovo);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const aggiornato = await Pg.findByIdAndUpdate(id, req.body, { new: true });
  res.json(aggiornato);
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  await Pg.findByIdAndDelete(id);
  res.json({ message: 'PG eliminato' });
};
