const express = require('express');
const app = express();
const db = require('./db');
app.use(express.static('public'));

app.get('/images', async (req, res) => {
    const images = await db.getImages();
    res.json(images.rows);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});
