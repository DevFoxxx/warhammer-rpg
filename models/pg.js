const mongoose = require('mongoose');

const pgSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // opzionale
  campagnaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campagna' }, // opzionale
  archetype: { type: String },
  career: { type: String },
  background: { type: String },
  divinita: { type: String, enum: ['Khorne','Nurgle','Slaanesh','Tzeentch','Indiviso'], default: 'Indiviso' }
}, { timestamps: true });

module.exports = mongoose.model('Pg', pgSchema);
