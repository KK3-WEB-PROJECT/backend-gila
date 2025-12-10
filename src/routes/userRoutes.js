const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require('../middleware/authMiddleware');
const uploadLocal = require("../middleware/uploadLocal");

router.put("/profile/:id", auth, uploadLocal.single("profile"),userController.updateProfileLocal);
router.get("/", auth, userController.getAllUsers);
router.get("/:id", auth, userController.getUserById);
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.put("/:id", auth, userController.updateUser);
router.delete("/:id", auth, userController.deleteUser);
router.delete("/:id/profile", userController.deleteProfile);



module.exports = router;
