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
  let book = new BookModel({
    title: req.body.title,
    price: parseFloat(req.body.price),
    photo: req.body.photo,
  })
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
  console.log('- updat ---------')
  console.log(req.body)
  let book = {
    title: req.body.title,
    price: parseFloat(req.body.price),
  }
  if (req.body.photo) {
    //Якщо надіслано нове фото, то змінюємо поле фото
    book.photo = req.body.photo
  }
  BookModel.findByIdAndUpdate(
    req.body._id,
    book,
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
