const multer = require("multer");
const path = require("path");

const storageAbsen = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/absen");
    },
    filename: (req, file, cb) => {
        cb(
            null,
            Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname)
        );
    },
});

const uploadAbsen = multer({ storage: storageAbsen });
module.exports = uploadAbsen;
