const express = require('express');
const path = require('path');
const multer = require('multer');
const app = express();

// Set up multer for storing uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');  // Save files to 'public/uploads' directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Create a unique filename
    }
});

const upload = multer({ storage: storage });

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for playing a specific video
app.get('/play-video', (req, res) => {
    const videoUrl = req.query.url;
    if (videoUrl) {
        res.sendFile(path.join(__dirname, 'public', 'video.html'));
    } else {
        res.status(404).send('Video not found');
    }
});

// Handle video upload and return the file URL
app.post('/upload-video', upload.single('video'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    // Return the file path as the URL
    const videoUrl = `/uploads/${req.file.filename}`;
    res.send(videoUrl);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    
});
app.post('/upload-video', upload.single('video'), (req, res) => {
    console.log("Upload request received");
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    const videoUrl = `/uploads/${req.file.filename}`;
    res.send(videoUrl);
});
