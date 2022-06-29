const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Створення схеми моделі
const bookScheme = new Schema({
  name: String,
  age: Number,
})
//Створення моделі
const Book = mongoose.model('Book', bookScheme)
