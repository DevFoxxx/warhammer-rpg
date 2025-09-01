const express = require('express');
const router = express.Router();
const pgController = require('../controllers/pgController');
const { authMiddleware, ensureMaster } = require('../middleware/authMiddleware');

// tutti possono leggere
router.get('/', pgController.getAll);

// solo master può creare/modificare/eliminare
router.post('/', authMiddleware, ensureMaster, pgController.create);
router.put('/:id', authMiddleware, ensureMaster, pgController.update);
router.delete('/:id', authMiddleware, ensureMaster, pgController.delete);

module.exports = router;
