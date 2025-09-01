const express = require('express');
const router = express.Router();
const campagnaController = require('../controllers/campagnaController');
const { authMiddleware, ensureMaster } = require('../middleware/authMiddleware');

// Tutti possono leggere le campagne
router.get('/', campagnaController.getAll);

// Solo master può creare nuova campagna
router.post('/', authMiddleware, ensureMaster, campagnaController.createCampagna);

// Solo master può aggiungere sessione
router.post('/:id/sessione', authMiddleware, ensureMaster, campagnaController.addSessione);

// Solo master può eliminare sessione
router.delete('/:id/sessione/:sessioneId', authMiddleware, ensureMaster, campagnaController.deleteSessione);

// Solo master può modificare sessione
router.put('/:id/sessione/:sessioneId', authMiddleware, ensureMaster, campagnaController.updateSessione);

module.exports = router;
