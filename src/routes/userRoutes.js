const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require('../middleware/authMiddleware');
const uploadLocal = require("../middleware/uploadLocal");

router.put("/profile/:id", auth, uploadLocal.single("profile"),userController.updateProfileLocal);
// router.put("/user/:id", auth, uploadLocal.single("photo"),userController.updateProfileLocal);
router.get("/", auth, userController.getAllUsers);
router.get("/:id", auth, userController.getUserById);
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.put("/:id", auth, userController.updateUser);
// router.put("/user/:id", auth, userController.updateProfileLocal);
router.delete("/:id", auth, userController.deleteUser);
router.delete("/:id/profile", userController.deleteProfile);



module.exports = router;
