const db = require('../config/database');

// GET semua pasien
exports.getPasien = (req, res) => {
    const sql = `
        SELECT p.*, u.username, u.nama_lengkap, o.nama_obat
        FROM data_pasien p
        LEFT JOIN users u ON p.id_user = u.id_user
        LEFT JOIN data_obat o ON p.id_obat = o.id_obat
        ORDER BY p.id_pasien DESC
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

// GET pasien by ID
exports.getPasienById = (req, res) => {
    const id = req.params.id;
    const sql = `
        SELECT p.*, u.username, u.nama_lengkap, o.nama_obat
        FROM data_pasien p
        LEFT JOIN users u ON p.id_user = u.id_user
        LEFT JOIN data_obat o ON p.id_obat = o.id_obat
        WHERE p.id_pasien = ?
    `;
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results[0]);
    });
};

// CREATE pasien
exports.createPasien = (req, res) => {
    const {
        nama,
        usia,
        kelas,
        keluhan,
        nadi_detak_jantung,
        penanganan,
        id_user,
        id_obat,
        obat_terpakai
    } = req.body;

    const sql = `
        INSERT INTO data_pasien
        (nama, usia, kelas, keluhan, nadi_detak_jantung, penanganan, id_user, id_obat, obat_terpakai)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        nama,
        usia,
        kelas,
        keluhan,
        nadi_detak_jantung,
        penanganan,
        id_user,
        id_obat,
        obat_terpakai
    ], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Data pasien berhasil ditambahkan" });
    });
};

// UPDATE pasien
exports.updatePasien = (req, res) => {
    const id = req.params.id;

    const {
        nama,
        usia,
        kelas,
        keluhan,
        nadi_detak_jantung,
        penanganan,
        id_user,
        id_obat,
        obat_terpakai
    } = req.body;

    const sql = `
        UPDATE data_pasien
        SET nama=?, usia=?, kelas=?, keluhan=?, nadi_detak_jantung=?, penanganan=?, id_user=?, id_obat=?, obat_terpakai=?
        WHERE id_pasien=?
    `;

    db.query(sql, [
        nama,
        usia,
        kelas,
        keluhan,
        nadi_detak_jantung,
        penanganan,
        id_user,
        id_obat,
        obat_terpakai,
        id
    ], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Data pasien berhasil diupdate" });
    });
};

// DELETE pasien
exports.deletePasien = (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM data_pasien WHERE id_pasien = ?";

    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Data pasien berhasil dihapus" });
    });
};
