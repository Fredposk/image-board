const express = require('express');
const morgan = require('morgan');
const { uploader } = require('./upload');
const s3 = require('./s3');
const { s3Url } = require('./config.json');

// Express
const app = express();
const db = require('./db');
// Open paths
app.use(express.static('public'));
app.use(express.static('dist'));
// Logging middleware
// app.use(morgan('dev'));

// body-parser
app.use(express.urlencoded({ extended: false }));

app.get('/images', async (req, res) => {
    const images = await db.getImages();
    res.json(images.rows);
});

app.get('/modal/:modalImage', async (req, res) => {
    const { modalImage } = req.params;
    const modal = await db.getImageModal(modalImage);
    res.json(modal.rows);
});

app.post('/upload', uploader.single('file'), s3.upload, async (req, res) => {
    const { title, description, username } = req.body;
    const { filename } = req.file;
    const url = `${s3Url}${filename}`;

    try {
        const tableData = await db.uploadImages(
            url,
            username,
            title,
            description
        );
        res.json(tableData.rows[0]);
    } catch (error) {
        console.log('no success');
        res.json({ success: false });
    }

    // if (req.file) {
    //     res.json({ success: true });
    // } else {
    //     res.json({ success: false });
    // }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});
