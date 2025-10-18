const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  subscribedCategories: [String],
});

module.exports = mongoose.model('User', UserSchema);
