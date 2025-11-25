const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
        const { username, email, pw, nama_lengkap, angkatan_jurusan, piket_status } = req.body;

        const hashedPassword = await bcrypt.hash(pw, 10);

        const newUser = {
            username,
            email,
            pw: hashedPassword,
            nama_lengkap,
            angkatan_jurusan,
            piket_status
        };

        User.create(newUser, (err, results) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: "User registered successfully", userId: results.insertId });
        });
    },

    loginUser: (req, res) => {
        const { email, pw } = req.body;

        User.getByEmail(email, async (err, results) => {
            if (err) return res.status(500).json({ error: err });

            if (results.length === 0) {
                return res.status(404).json({ message: "Email not found" });
            }

            const user = results[0];

            const match = await bcrypt.compare(pw, user.pw);
            if (!match) return res.status(400).json({ message: "Wrong password" });

            // const token = jwt.sign({ id_user: user.id_user }, "SECRETKEY");
            const token = jwt.sign(
                { id_user: user.id_user },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );

            res.json({ message: "Login success", token });
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

    deleteUser: (req, res) => {
        const id = req.params.id;

        User.delete(id, (err, results) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: "User deleted successfully" });
        });
    }

};
