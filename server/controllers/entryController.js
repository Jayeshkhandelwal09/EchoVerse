const Entry = require('../models/Entry');
const cloudinary = require('../config/cloudinary');

// @desc Create new entry
// @route POST /api/entries
// @access Private
exports.createEntry = async (req, res) => {
  try {
    const { title, mood, unlockAt } = req.body;

    // File uploaded?
    if (!req.file) {
      return res.status(400).json({ message: 'No audio file uploaded' });
    }

    // Upload audio to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'video', // Important for audio files
      folder: 'echoverse-audios',
    });

    const entry = await Entry.create({
      title,
      mood,
      audioUrl: result.secure_url,
      unlockAt,
      user: req.user._id,
    });

    res.status(201).json(entry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while creating entries' });
  }
};

// @desc Get all entries for logged-in user
// @route GET /api/entries
// @access Private
exports.getEntries = async (req, res) => {
  try {
    const entries = await Entry.find({ user: req.user._id }).sort({ createdAt: -1 });

    const formattedEntries = entries.map(entry => ({
      _id: entry._id,
      title: entry.title,
      mood: entry.mood,
      createdAt: entry.createdAt,
      unlockAt: entry.unlockAt,
      isUnlocked: new Date(entry.unlockAt) <= new Date(),
      audioUrl: new Date(entry.unlockAt) <= new Date() ? entry.audioUrl : null,
    }));

    res.json(formattedEntries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while getting entries' });
  }
};
