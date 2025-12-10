const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

module.exports = {

    getAllUsers: (req, res) => {
        User.getAll((err, results) => {
            if (err) return res.status(500).json({ error: err });
            res.json(results);
        });
    },

    getUserById: (req, res) => {
        const id = req.params.id;
        User.getById(id, (err, results) => {
            if (err) return res.status(500).json({ error: err });
            res.json(results[0]);
        });
    },

    registerUser: async (req, res) => {
        const { username, email, pw, nama_lengkap, angkatan_jurusan, piket_status, role } = req.body;

        // validasi role (harus admin atau staff_piket)
        if (!["admin", "staff_piket"].includes(role)) {
            return res.status(400).json({ message: "Role must be 'admin' or 'staff_piket'" });
        }

        const hashedPassword = await bcrypt.hash(pw, 10);

        const newUser = {
            username,
            email,
            pw: hashedPassword,
            nama_lengkap,
            angkatan_jurusan,
            piket_status,
            role
        };

        User.create(newUser, (err, results) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: "User registered successfully", userId: results.insertId });
        });
    },
    loginUser: (req, res) => {
        const { email, pw } = req.body;

        // Cek input kosong
        if (!email || !pw) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        User.getByEmail(email, async (err, results) => {
            if (err) return res.status(500).json({ error: err });

            // Email tidak ditemukan
            if (results.length === 0) {
                return res.status(404).json({ message: "Email not found" });
            }

            const user = results[0];

            // Password di database kosong / null → PERINGATAN BERBAHAYA
            if (!user.pw) {
                return res.status(500).json({ message: "User has no password stored in DB!" });
            }

            // Cek apakah pw cocok
            const match = await bcrypt.compare(pw, user.pw);
            if (!match) {
                return res.status(400).json({ message: "Wrong password" });
            }

            // Buat token
            const token = jwt.sign(
                { id_user: user.id_user, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );

            res.json({ message: "Login success", token, id_user: user.id_user });
        });
    },


    updateUser: (req, res) => {
        const id = req.params.id;
        const data = req.body;

        User.update(id, data, (err, results) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: "User updated successfully" });
        });
    },
    
    updateProfileLocal: (req, res) => {
        const id = req.params.id;
        const { username, nama_lengkap } = req.body; // ambil input teks FE

        // Data yang mau di-update
        let updateData = {
            username,
            nama_lengkap,
        };

        // Jika user upload foto → tambahkan ke updateData
        if (req.file) {
            updateData.profile = req.file.filename;
        }

        // Jika TIDAK ada file DAN tidak ada data teks, hentikan
        if (!req.file && !username && !nama_lengkap) {
            return res.status(400).json({ message: "Nothing to update" });
        }

        User.update(id, updateData, (err, results) => {
            if (err) return res.status(500).json({ error: err });

            return res.json({
                message: "Profile updated successfully",
                updated: updateData,
            });
        });
    },

    deleteUser: (req, res) => {
        const id = req.params.id;

        User.delete(id, (err, results) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: "User deleted successfully" });
        });
    },

    deleteProfile: (req, res) => {
    const id = req.params.id;

    // CARI USER DARI DATABASE
    User.getById(id, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = results[0];
        const oldPhoto = user.profile;

        // JIKA TIDAK ADA FOTO
        if (!oldPhoto) {
            return res.json({ message: "User has no profile photo to delete" });
        }

        const filePath = path.join(__dirname, "../../uploads/profile", oldPhoto);

        console.log("Delete photo:", filePath);

        fs.unlink(filePath, (err) => {
            if (err) {
                console.log("Failed to delete file:", err);
            }

            User.update(id, { profile: null }, (err) => {
                if (err) return res.status(500).json({ error: err });

                return res.json({
                    message: "Profile photo deleted successfully",
                    deleted: oldPhoto,
                });
            });
        });
    });
}

};
