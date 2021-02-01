const express = require('express');
const morgan = require('morgan');
const { uploader } = require('./upload');

const app = express();
const db = require('./db');
// Open paths
app.use(express.static('public'));
app.use(express.static('dist'));
// Logging middleware
app.use(morgan('dev'));

app.get('/images', async (req, res) => {
    const images = await db.getImages();
    res.json(images.rows);
});

app.post('/upload', uploader.single('file'), (req, res) => {
    // console.log(req.body);
    // console.log(req.file);

    if (req.file) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});
