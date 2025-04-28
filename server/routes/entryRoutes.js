const express = require('express');
const router = express.Router();
const { createEntry, getEntries } = require('../controllers/entryController');
const { protect } = require('../middlewares/authMiddleware');
const multer = require('multer');

// Setup multer for temporary uploads
const upload = multer({ dest: 'uploads/' }); // local folder temporarily

// Routes
router.post('/', protect, upload.single('audio'), createEntry);
router.get('/', protect, getEntries);

module.exports = router;
