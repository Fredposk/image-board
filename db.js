const spicedPg = require('spiced-pg');
const db = spicedPg(
    process.env.DATABASE_URL ||
        'postgres:postgres:postgres@localhost:5432/image_board'
);

module.exports.getImages = () =>
    db.query(`SELECT * FROM images ORDER BY created_at DESC limit 12;`);

module.exports.getAllImages = () =>
    db.query(`SELECT * FROM images ORDER BY created_at DESC;`);

module.exports.searchDb = (title, description) =>
    db.query(
        `SELECT * from images where title in ('${title}') OR description in ('${description}') order by created_at DESC;`
    );

module.exports.getMoreImages = (date) =>
    db.query(
        `SElect * from images where created_at < '${date}' order by created_at DESC LIMIT 12`
    );

module.exports.uploadImages = (url, username, title, description) => {
    const q = `INSERT into images (url, username, title, description) VALUES ($1, $2, $3, $4) RETURNING *`;
    const params = [url, username, title, description];
    return db.query(q, params);
};

module.exports.getImageModal = (id) => {
    const q = `SELECT * FROM images WHERE id = $1`;
    const params = [id];
    return db.query(q, params);
};

module.exports.uploadComment = (comment, username, id) => {
    const q = `INSERT into comments (comment, username, id) VALUES ($1, $2, $3) RETURNING *`;
    const params = [comment, username, id];
    return db.query(q, params);
};

module.exports.getComments = (id) => {
    const q = `SELECT * FROM comments WHERE id = $1`;
    const params = [id];
    return db.query(q, params);
};
