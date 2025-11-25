const express = require('express');
const router = express.Router();
const pasienController = require('../controllers/pasienController');

router.get('/', pasienController.getPasien);
router.get('/:id', pasienController.getPasienById);
router.post('/tambah_pasien', pasienController.createPasien);
router.put('/:id', pasienController.updatePasien);
router.delete('/:id', pasienController.deletePasien);

module.exports = router;
