const express = require('express');
const morgan = require('morgan');
const moment = require('moment');
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
app.use(morgan('dev'));
// json handling
app.use(express.json());

// body-parser
app.use(express.urlencoded({ extended: false }));

app.get('/images', async (req, res) => {
    try {
        const images = await db.getImages();
        res.json(images.rows);
    } catch (error) {}
});

app.get('(/loadmore/:date)', async (req, res) => {
    const { date } = req.params;
    try {
        const images = await db.getMoreImages(date);
        res.json(images.rows);
    } catch (error) {
        console.log('no success');
        res.json({ success: false });
    }
});

app.get('/modal/:modalImage', async (req, res) => {
    const { modalImage } = req.params;

    try {
        const modal = await db.getImageModal(modalImage);

        const date = new Date(`${modal.rows[0].created_at}`);
        const date2 = moment(date).fromNow();

        res.json({ data: modal.rows, date: `${date2}` });
    } catch (error) {
        console.log('no success');
        res.json({ success: false });
    }
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
});

app.get('/comment/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const allComments = await db.getComments(id);
        res.json(allComments.rows);
    } catch (error) {
        console.log('no success');
        res.json({ success: false });
    }
});

app.post('/comment', async (req, res) => {
    const { comment, id, username } = req.body;
    try {
        const newComment = await db.uploadComment(comment, username, id);
        console.log(newComment.rows[0]);
        res.json(newComment.rows[0]);
    } catch (error) {
        res.json({ success: false });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});
