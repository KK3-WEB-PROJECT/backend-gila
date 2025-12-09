const db = require("../config/database");

const Absen = {
    createAbsen: (data, callback) => {
        const sql = "INSERT INTO absen SET ?";
        db.query(sql, data, callback);
    },

    checkAlreadyAbsenToday: (id_user, callback) => {
        const sql = `
            SELECT * FROM absen 
            WHERE id_user = ? 
            AND DATE(created_at) = CURDATE()
        `;
        db.query(sql, [id_user], callback);
    },

    getByUser: (id_user, callback) => {
        const sql = `
            SELECT * FROM absen 
            WHERE id_user = ?
            ORDER BY created_at DESC
        `;
        db.query(sql, [id_user], callback);
    },

    getAll: (callback) => {
        const sql = `
            SELECT a.*, u.nama_lengkap, u.username
            FROM absen a
            JOIN users u ON a.id_user = u.id_user
            ORDER BY a.created_at DESC
        `;
        db.query(sql, callback);
    }

};

module.exports = Absen;
