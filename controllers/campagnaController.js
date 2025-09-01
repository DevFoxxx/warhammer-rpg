const Campagna = require('../models/campagna');

// Leggere tutte le campagne
exports.getAll = async (req, res) => {
  try {
    const campagne = await Campagna.find();
    res.json(campagne);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Creare nuova campagna
exports.createCampagna = async (req, res) => {
  const { titolo, descrizione, system } = req.body;
  if (!titolo || !system) return res.status(400).json({ error: 'Titolo e system richiesti' });

  try {
    const campagna = await Campagna.create({ titolo, descrizione, system });
    res.json(campagna);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Aggiungere una sessione
exports.addSessione = async (req, res) => {
  const { id } = req.params;
  const { numero, data, descrizione } = req.body;

  try {
    const campagna = await Campagna.findById(id);
    if (!campagna) return res.status(404).json({ error: 'Campagna non trovata' });

    campagna.sessioni.push({ numero, data, descrizione });
    await campagna.save();

    res.json(campagna);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminare sessione
exports.deleteSessione = async (req, res) => {
  const { id, sessioneId } = req.params;

  try {
    const campagna = await Campagna.findById(id);
    if (!campagna) return res.status(404).json({ error: 'Campagna non trovata' });

    campagna.sessioni = campagna.sessioni.filter(s => s._id.toString() !== sessioneId);
    await campagna.save();

    res.json({ message: 'Sessione eliminata' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Modifica una sessione
exports.updateSessione = async (req, res) => {
  const { id, sessioneId } = req.params;
  const { numero, data, descrizione } = req.body;

  try {
    const campagna = await Campagna.findById(id);
    if (!campagna) return res.status(404).json({ error: 'Campagna non trovata' });

    const sessione = campagna.sessioni.id(sessioneId);
    if (!sessione) return res.status(404).json({ error: 'Sessione non trovata' });

    // Aggiorna i campi
    if (numero !== undefined) sessione.numero = numero;
    if (data !== undefined) sessione.data = data;
    if (descrizione !== undefined) sessione.descrizione = descrizione;

    await campagna.save();
    res.json(sessione);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore server' });
  }
};
