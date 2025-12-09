const express = require("express");
const router = express.Router();
const absenController = require("../controllers/absenController");
const uploadAbsen = require("../middleware/uploadAbsen");

router.post("/:id", uploadAbsen.single("photo"), absenController.absenMasuk);
router.get("/users/:id", absenController.getAbsenByUser);
router.get("/", absenController.getAllAbsen);
router.get("/status/:id", absenController.checkStatusToday);

module.exports = router;
