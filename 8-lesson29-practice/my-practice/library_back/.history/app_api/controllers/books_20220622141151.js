const formidable = require('formidable')
const BookModel = require('../models/book')

module.exports.addBook = function (req, res, next) {
  num = 0

  const form = formidable({ multiples: true })
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err)
      return
    }

    req.body.book = new BookModel({
      title: fields.title,
      price: parseFloat(fields.price),
      photo: {
        data: files.photo.buffer,
        contentType: files.photo.mimetype,
      },
      // photo: '/images/' + files.photo.originalFilename,
    })
  })
  form.on('end', function (d) {
    console.log('3333333333')
    num++
    //Помилка модуля (викликається двічі)
    if (num == 1) {
      //Збереження моделі і відключення від бази даних
      req.body.book.save(function (err) {
        // mongoose.disconnect();  // від’єднання від бази даних
        if (err) {
          console.log(err)
          next(err)
          return
        }

        console.log('Збережено', book)
        res.redirect('/books')
      })
    }
  })
}
