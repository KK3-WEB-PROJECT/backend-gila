// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/profile"); // folder tujuan upload
//     },
//     filename: (req, file, cb) => {
//         const uniqueName = Date.now() + path.extname(file.originalname);
//         cb(null, uniqueName);
//     }
// });

// const uploadLocal = multer({
//     storage,
//     limits: { fileSize: 2 * 1024 * 1024 }, // batas 2MB
//     fileFilter: (req, file, cb) => {
//         // hanya gambar
//         const allowed = ["image/jpeg", "image/png", "image/jpg"];
//         if (!allowed.includes(file.mimetype)) {
//             return cb(new Error("Only JPG/PNG allowed"), false);
//         }
//         cb(null, true);
//     }
// });

// module.exports = uploadLocal;
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/profile/"); // pastikan folder ini ADA!
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const uploadLocal = multer({ storage });
module.exports = uploadLocal;