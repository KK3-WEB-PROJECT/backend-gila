const express = require('express');
const router = express.Router();
const piketController = require('../controllers/piketController');

router.get('/', piketController.getPiket);
router.get('/:id', piketController.getPiketById);
router.post('/tambah_piket', piketController.createPiket);
router.put('/:id', piketController.updatePiket);
router.delete('/:id', piketController.deletePiket);

module.exports = router;
