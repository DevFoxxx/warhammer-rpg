const mongoose = require('mongoose');

const pgSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  campagnaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campagna' },
  archetype: String,
  career: String,
  stats: { type: Map, of: Number }, // esempio: stats.get('WS') => 45
  wounds: { current: Number, max: Number },
  xp: Number,
  inventory: [{ name: String, qty: Number, notes: String }],
  abilities: [{ name: String, description: String }],
  background: String,
  notes: [{ sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sessione' }, text: String }]
}, { timestamps: true });

module.exports = mongoose.model('Pg', pgSchema);
