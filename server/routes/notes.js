const express = require('express');
const Note = require('../models/Note');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// ✅ Get all notes for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });
    res.json(notes);
  } catch (err) {
    console.error('GET /api/notes error:', err);
    res.sendStatus(500);
  }
});

// ✅ Create a new note
router.post('/', auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({
      userId: req.user.id,
      title,
      content,
    });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    console.error('POST /api/notes error:', err);
    res.sendStatus(500);
  }
});

// ✅ Delete a note
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Note.deleteOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (deleted.deletedCount === 0) {
      return res.sendStatus(404);
    }
    res.sendStatus(204);
  } catch (err) {
    console.error('DELETE /api/notes error:', err);
    res.sendStatus(500);
  }
});

module.exports = router;
