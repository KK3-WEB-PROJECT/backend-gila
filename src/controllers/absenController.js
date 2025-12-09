const Absen = require("../models/absenModel");

module.exports = {
    absenMasuk: (req, res) => {
        const id_user = req.params.id;

        if (!req.file) {
            return res.status(400).json({ message: "Foto absen wajib diupload!" });
        }

        const filePath = req.file.filename;

        Absen.checkAlreadyAbsenToday(id_user, (err, result) => {
            if (err) return res.status(500).json({ error: err });

            if (result.length > 0) {
                return res.json({
                    message: "Kamu sudah absen hari ini!",
                    data: result[0]
                });
            }

            const data = {
                id_user,
                file_path: filePath,
                status: "sudah absen"
            };

            Absen.createAbsen(data, (err, results) => {
                if (err) return res.status(500).json({ error: err });

                return res.json({
                    message: "Absen berhasil!",
                    absen: data
                });
            });
        });
    },
        getAbsenByUser: (req, res) => {
        const id_user = req.params.id;

        Absen.getByUser(id_user, (err, results) => {
            if (err) return res.status(500).json({ error: err });

            return res.json({
                message: "Data absen user ditemukan",
                data: results
            });
        });
    },
        getAllAbsen: (req, res) => {
        Absen.getAll((err, results) => {
            if (err) return res.status(500).json({ error: err });

            return res.json({
                message: "Semua data absen ditemukan",
                data: results
            });
        });
    },
        checkStatusToday: (req, res) => {
        const id_user = req.params.id;

        Absen.checkAlreadyAbsenToday(id_user, (err, results) => {
            if (err) return res.status(500).json({ error: err });

            if (results.length > 0) {
                return res.json({ status: "sudah absen", data: results[0] });
            }

            return res.json({ status: "belum absen" });
        });
    }
};

