const DataObat = require("../models/dataObatModel");

module.exports = {

    getAllObat: (req, res) => {
        DataObat.getAll((err, results) => {
            if (err) return res.status(500).json({ error: err });
            res.json(results);
        });
    },

    getObatById: (req, res) => {
        const id = req.params.id;
        DataObat.getById(id, (err, results) => {
            if (err) return res.status(500).json({ error: err });
            res.json(results[0]);
        });
    },

    createObat: (req, res) => {
        const data = req.body;

        DataObat.create(data, (err, results) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: "Obat berhasil ditambahkan", insertedId: results.insertId });
        });
    },

    updateObat: (req, res) => {
        const id = req.params.id;
        const data = req.body;

        DataObat.update(id, data, (err, results) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: "Obat berhasil diupdate" });
        });
    },

    deleteObat: (req, res) => {
        const id = req.params.id;

        DataObat.delete(id, (err, results) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: "Obat berhasil dihapus" });
        });
    }

};
