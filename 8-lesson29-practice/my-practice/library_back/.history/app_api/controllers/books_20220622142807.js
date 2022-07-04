const formidable = require('formidable')
const BookModel = require('../models/book')

const sendJSONResponse=(res,status,content)=>{
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.status(status).json(content);
}


module.exports.getList = function (req, res) {
  const searchObj = req.query.searchParams || {}

  BookModel.find(searchObj, function (err, books) {
    if (err) return sendJSONResponse(res, 500,{success:false, err: { msg: 'Fetch faild!' } })

    sendJSONResponse(res, 200,{success:true, data:books})
  })
}

module.exports.add = function (req, res, next) {
  let num = 0
  let book
  const form = formidable({ multiples: true })
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err)
      return
    }

    book = new BookModel({
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
      book.save(function (err) {
        if (err) {
          sendJSONResponse(res, 500,{success:false, err: { msg: 'Saving faild!' } })
          return
        }
         sendJSONResponse(res, 201,{success:true})
      })
    }
  })
}

module.exports.delete = function (req, res) {
  BookModel.findByIdAndDelete(req.body.id, function (err) {
    if (err) {
        sendJSONResponse(res, 500,{success:false, err: { msg: 'Delete faild!' } })
        return
    }
    sendJSONResponse(res, 204,{success:true})
  })
}

module.exports.update = function (req, res, next) {
  let num = 0
  let book
  const form = formidable({ multiples: true })
  form.parse(req, (err, fields, files) => {
    console.log('111111')
    if (err) {
      next(err)
      return
    }

    //Створення об’єкта моделі
    book = {
      title: fields.title,
      price: parseFloat(fields.price),
    }
    req.body.id = fields.id
    req.body.book = book

    if (files.photo.originalFilename) {
      //Якщо надіслано нове фото, то змінюємо поле фото
      book.photo = {
        data: files.photo.buffer,
        contentType: files.photo.mimetype,
      }
    }
  })
  form.on('end', function (d) {
    console.log('3333333333')
    num++
    //Помилка модуля (викликається двічі)
    if (num == 1) {
      //Збереження моделі і відключення від бази даних
      console.log('new - book: ' + req.body)
      console.log(req.body)
      console.log(req.body.book)
      BookModel.findByIdAndUpdate(
        req.body.id,
        req.body.book,
        { new: true }, //у колбек передається оновлений документ
        function (err, newBook) {
          // mongoose.disconnect()
          if (err) return console.log(err)

          console.log('Оновлений об"єкт', newBook)
          res.redirect('/books')
        }
      )
    }
  })
}

module.exports.getById=function (req, res, next) {
  //Пошук об"єкта-книги за id
  BookModel.findById(req.params.id, function (err, searchBook) {
    //mongoose.disconnect()
    if (err) return console.log(err)

    res.render('booksFormEdit', { title: 'Edit book', book: searchBook })
  })
})
