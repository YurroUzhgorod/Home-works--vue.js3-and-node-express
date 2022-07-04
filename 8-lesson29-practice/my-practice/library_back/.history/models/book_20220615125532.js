const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Створення схеми моделі
const bookScheme = new Schema({
  title: String,
  price: Number,
  photo: String,
})
//Створення моделі
const Book = mongoose.model('Book', bookScheme)

module.exports = Book
