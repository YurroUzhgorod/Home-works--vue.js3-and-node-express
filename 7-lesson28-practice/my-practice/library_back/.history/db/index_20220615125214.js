const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/booksdb', { useNewUrlParser: true })

async function main() {
  await mongoose.connect('mongodb://localhost:27017/booksdb', {
    useNewUrlParser: true,
  })
}

module.exports main
