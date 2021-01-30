const spicedPg = require('spiced-pg');
const db = spicedPg(
    process.env.DATABASE_URL ||
        'postgres:postgres:postgres@localhost:5432/image_board'
);

module.exports.getImages = () => db.query(`SELECT * FROM images;`);
