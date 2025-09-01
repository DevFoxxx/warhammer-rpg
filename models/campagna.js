const mongoose = require('mongoose');

const sessioneSchema = new mongoose.Schema({
  numero: { type: Number, required: true },
  data: { type: Date, required: true },
  descrizione: { type: String, required: true }
});

const campagnaSchema = new mongoose.Schema({
  titolo: { type: String, required: true },
  descrizione: { type: String },
  system: { type: String, required: true },
  status: { type: String, default: 'active' },
  tags: [String],
  sessioni: [sessioneSchema]
}, { timestamps: true });

module.exports = mongoose.model('Campagna', campagnaSchema, 'campagnas');
