const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/booksdb', { useNewUrlParser: true })

async function connectDb() {
  await mongoose.connect('mongodb://localhost:27017/booksdb', {
    useNewUrlParser: true,
  })
}

module.exports = connectDb
