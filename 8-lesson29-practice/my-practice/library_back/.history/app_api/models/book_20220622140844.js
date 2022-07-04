const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Створення схеми моделі
const bookScheme = new Schema({
  title: String,
  price: Number,
  photo: {
    data: Buffer,
    contentType: String,
  },
})
//Створення моделі
const BookModel = mongoose.model('Book', bookScheme)

module.exports = BookModel
