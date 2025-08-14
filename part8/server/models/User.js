const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: [3, "Username must be at least 3 characters long"],
  },
  favoriteGenre: {
    type: String,
    required: true,
    minlength: [1, "Genre must be at least 1 characters long"],
  },
});

module.exports = mongoose.model("User", userSchema);
