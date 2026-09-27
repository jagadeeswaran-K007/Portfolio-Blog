const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  newTitle: { type: String, required: true },
  newContent: { type: String, required: true },
  tags: [{ type: String }],
  date: { type: String, required: true },
  likes: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);