const db = require("../config/database");

const DataObat = {

    getAll: (callback) => {
        db.query("SELECT * FROM data_obat", callback);
    },

    getById: (id, callback) => {
        db.query("SELECT * FROM data_obat WHERE id_obat = ?", [id], callback);
    },

    create: (data, callback) => {
        db.query("INSERT INTO data_obat SET ?", data, callback);
    },

    update: (id, data, callback) => {
        db.query("UPDATE data_obat SET ? WHERE id_obat = ?", [data, id], callback);
    },

    delete: (id, callback) => {
        db.query("DELETE FROM data_obat WHERE id_obat = ?", [id], callback);
    }

};

module.exports = DataObat;
