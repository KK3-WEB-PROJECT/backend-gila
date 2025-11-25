// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//   // Ambil token dari header Authorization
//   const authHeader = req.headers["authorization"];

//   if (!authHeader) {
//     return res.status(401).json({ message: "Token tidak ditemukan" });
//   }

//   // Format token harus: "Bearer tokenmu"
//   const token = authHeader.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "Token tidak valid" });
//   }

//   try {
//     // Verifikasi token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Simpan data user ke req (supaya bisa dipakai di controller)
//     req.user = decoded;

//     next(); // lanjut ke controller
//   } catch (err) {
//     return res.status(401).json({ message: "Token salah atau expired" });
//   }
// };

// module.exports = authMiddleware;

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json({ message: "Token tidak ditemukan" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Token tidak valid" });

        req.user = user; // simpan data user ke request
        next();
    });
};

