const formidable = require('formidable')
const BookModel = require('../models/book')

const sendJSONResponse=(res,status,content)=>{
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.status(status).json(content);
}


module.exports.getList = function (req, res, next) {
  const searchObj = req.query.searchParams || {}

  BookModel.find(searchObj, function (err, books) {
    //<-- Здійснюємо пошук
    if (err) return sendJSONResponse(res, 500,{success:false, err: { msg: 'Fetch faild!' } })

sendJSONResponse(200,{success:true, data:books})

  })
}

module.exports.add = function (req, res, next) {
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

module.exports.delete = function (req, res, next) {
  console.log('delete--------------------------')
  console.log(req.body.id)
  // data.books = data.books.filter((item) => item.id != req.body.id)
  // fs.writeFileSync(req.dbDir + '/data.json', JSON.stringify(data))
  BookModel.findByIdAndDelete(req.body.id, function (err, doc) {
    // mongoose.disconnect()
    if (err) return console.log(err)
  })

  res.send({ success: true })
}

module.exports.update = function (req, res, next) {
  num = 0
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
