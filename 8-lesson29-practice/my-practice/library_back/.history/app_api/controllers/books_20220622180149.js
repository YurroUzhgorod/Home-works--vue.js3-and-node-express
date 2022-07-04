const formidable = require('formidable')
const BookModel = require('../models/book')
const fs = require('fs')

const sendJSONResponse = (res, status, content) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.status(status).json(content)
}

module.exports.getList = function (req, res) {
  const searchObj = req.query.searchParams || {}

  BookModel.find(searchObj, function (err, books) {
    if (err)
      return sendJSONResponse(res, 500, {
        success: false,
        err: { msg: 'Fetch faild!' },
      })

    sendJSONResponse(res, 200, { success: true, data: books })
  })
}

module.exports.add = function (req, res, next) {
  let num = 0
  let book
  console.log('req.body')
  console.log(req.body)
  const form = formidable({ multiples: true })
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err)
      return
    }
    console.log('files.photo')
    console.log(files.photo)
    book = new BookModel({
      title: fields.title,
      price: parseFloat(fields.price),
      photo: {
        data: fs.readFileSync(files.photo.filepath),
        contentType: files.photo.mimetype,
      },
    })
  })
  form.on('end', function (d) {
    console.log('3333333333')
    num++
    //Помилка модуля (викликається двічі)
    if (num == 1) {
      //Збереження моделі і відключення від бази даних
      book.save(function (err, savedBook) {
        if (err) {
          sendJSONResponse(res, 500, {
            success: false,
            err: { msg: 'Saving faild!' },
          })
          return
        }
        sendJSONResponse(res, 201, { success: true, data: savedBook })
      })
    }
  })
}

module.exports.delete = function (req, res) {
  console.log('---------req.body')
  console.log(req.body)
  BookModel.findByIdAndDelete(req.body.id, function (err) {
    if (err) {
      console.log('---------err')
      console.log(err)
      sendJSONResponse(res, 500, {
        success: false,
        err: { msg: 'Delete faild!' },
      })
      return
    }
    sendJSONResponse(res, 200, { success: true })
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
    req.body.id = fields._id
    req.body.book = book
    console.log('req.body.id')
    console.log(req.body.id)
    console.log('req.body.book')
    console.log(req.body.book)
    if (files.photo.originalFilename) {
      //Якщо надіслано нове фото, то змінюємо поле фото
      book.photo = {
        data: fs.readFileSync(files.photo.filepath),
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
      BookModel.findByIdAndUpdate(
        req.body.id,
        req.body.book,
        { new: true }, //у колбек передається оновлений документ
        function (err) {
          // mongoose.disconnect()
          if (err) {
            sendJSONResponse(res, 500, {
              success: false,
              err: { msg: 'Update faild!' },
            })
            return
          }

          sendJSONResponse(res, 200, { success: true })
        }
      )
    }
  })
}

module.exports.getById = function (req, res) {
  //Пошук об"єкта-книги за id
  BookModel.findById(req.params.id, function (err, searchBook) {
    if (err) {
      sendJSONResponse(res, 500, {
        success: false,
        err: { msg: 'Find book faild!' },
      })
      return
    }
    sendJSONResponse(res, 200, { success: true, data: searchBook })
  })
}
