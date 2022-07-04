const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Створення схеми моделі
const authorScheme = new Schema({
  name: String,
  genre: String,
  yearOfBorn: Number,
  photo: String,
});
//Створення моделі
const AuthorModel = mongoose.model("Author", authorScheme);

module.exports = AuthorModel;
