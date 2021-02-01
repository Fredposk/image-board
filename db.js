const spicedPg = require('spiced-pg');
const db = spicedPg(
    process.env.DATABASE_URL ||
        'postgres:postgres:postgres@localhost:5432/image_board'
);

module.exports.getImages = () => db.query(`SELECT * FROM images;`);

module.exports.uploadImages = (url, username, title, description) => {
    const q = `INSERT into images (url, username, title, description) VALUES ($1, $2, $3, $4) RETURNING *`;
    const params = [url, username, title, description];
    return db.query(q, params);
};
