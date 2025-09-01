const mongoose = require('mongoose');

const sessioneSchema = new mongoose.Schema({
  campagnaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campagna', required: true },
  numero: Number,
  titolo: String,
  contenuto: String,
  data: Date,
  durataMinuti: Number,
  playersPresent: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  attachments: [{ filename: String, url: String }],
  notes: [{ authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, text: String, createdAt: Date }]
}, { timestamps: true });

module.exports = mongoose.model('Sessione', sessioneSchema);
