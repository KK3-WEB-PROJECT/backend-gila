const db = require('../config/database');

// GET semua data piket
exports.getPiket = (req, res) => {
    const sql = `
        SELECT p.*, u.username, u.nama_lengkap 
        FROM data_piket p
        JOIN users u ON p.id_user = u.id_user
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

// GET data piket by ID
exports.getPiketById = (req, res) => {
    const id = req.params.id;
    const sql = `
        SELECT p.*, u.username, u.nama_lengkap
        FROM data_piket p
        JOIN users u ON p.id_user = u.id_user
        WHERE p.id_piket = ?
    `;
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results[0]);
    });
};

// CREATE data piket
exports.createPiket = (req, res) => {
    const { id_user, tanggal_piket, jam_piket, status_piket, update_obat } = req.body;

    const sql = `
        INSERT INTO data_piket (id_user, tanggal_piket, jam_piket, status_piket, update_obat)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [id_user, tanggal_piket, jam_piket, status_piket, update_obat], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Data piket berhasil ditambahkan" });
    });
};

// UPDATE data piket
exports.updatePiket = (req, res) => {
    const id = req.params.id;
    const { id_user, tanggal_piket, jam_piket, status_piket, update_obat } = req.body;

    const sql = `
        UPDATE data_piket
        SET id_user=?, tanggal_piket=?, jam_piket=?, status_piket=?, update_obat=?
        WHERE id_piket=?
    `;

    db.query(sql, [id_user, tanggal_piket, jam_piket, status_piket, update_obat, id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Data piket berhasil diupdate" });
    });
};

// DELETE data piket
exports.deletePiket = (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM data_piket WHERE id_piket = ?";

    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Data piket berhasil dihapus" });
    });
};
