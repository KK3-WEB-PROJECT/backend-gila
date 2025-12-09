const express = require("express");
const router = express.Router();
const dataObatController = require("../controllers/dataObatController");

router.get("/", dataObatController.getAllObat);
router.get("/:id", dataObatController.getObatById);
router.post("/tambah_obat", dataObatController.createObat);
// router.get("/tambah_obat", dataObatController.createObat);
router.put("/:id", dataObatController.updateObat);
router.delete("/:id", dataObatController.deleteObat);

module.exports = router;
