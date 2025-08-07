const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: [3, "Title must be at least 3 characters long"],
    unique: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
  published: {
    type: Number,
    required: true,
  },
  genres: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("Book", bookSchema);
