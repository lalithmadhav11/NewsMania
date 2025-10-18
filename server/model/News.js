const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
  author: String,
  readTime: { type: Number, default: 3 }, // Average read time in minutes
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now },
});

// Create text index for search functionality
NewsSchema.index({ title: 'text', content: 'text' });

module.exports = mongoose.model('News', NewsSchema);
