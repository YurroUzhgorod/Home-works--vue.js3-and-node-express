var express = require('express')
var router = express.Router()
var path = require('path')
const fs = require('fs')
const formidable = require('formidable')
const BookModel = require('../models/book')

const connectDb = require('../db')
connectDb()

const data = require('../db/data.json')

/* GET home page. */
router.get('/', function (req, res, next) {
  // const books= data.books
  // res.render('booksList', { title: 'Express', books })
  const searchObj = {}
  if (req.query.searchTitle) searchObj.title = req.query.searchTitle
  console.log('-searchObj')
  console.log(searchObj)
  BookModel.find(searchObj, function (err, books) {
    // mongoose.disconnect()
    if (err) return res.status(500).json({ err: { msg: 'Fetch faild!' } })
    if (searchObj.title) res.render('booksListOnly', { books })
    else res.render('booksList', { title: 'Books', books })

    // res.status(200).json({products:docs });
  })
})

/* GET home page. */
router.delete('/', function (req, res, next) {
  console.log('delete--------------------------')
  console.log(req.body.id)
  // data.books = data.books.filter((item) => item.id != req.body.id)
  // fs.writeFileSync(req.dbDir + '/data.json', JSON.stringify(data))
  BookModel.findByIdAndDelete(req.body.id, function (err, doc) {
    // mongoose.disconnect()
    if (err) return console.log(err)
  })

  res.send({ success: true })
})

/* POST home page. */
let num
router.post('/new', function (req, res, next) {
  num = 0

  const form = formidable({ multiples: true })
  form
    .parse(req, (err, fields, files) => {
      console.log('111111')
      if (err) {
        next(err)
        return
      }
      //Аналіз полів

      // data.books.push({
      //   id: new Date().getTime(),
      //   title: fields.title,
      //   price: parseFloat(fields.price),
      //   photo: '/images/' + files.photo.originalFilename,
      // })

      //Створення об’єкта моделі
      req.body.book = new BookModel({
        title: fields.title,
        price: parseFloat(fields.price),
        photo: '/images/' + files.photo.originalFilename,
      })
    })
    .on('fileBegin', function (name, file) {
      console.log('222222')
      //Аналіз подій
      //Зміна розташування файлів
      file.filepath = req.imagesDir + '\\' + file.originalFilename
    })
  form.on('end', function (d) {
    console.log('3333333333')
    num++
    //Помилка модуля (викликається двічі)
    if (num == 1) {
      // fs.writeFileSync(req.dbDir + '/data.json', JSON.stringify(data))
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
})

router.post('/edit', function (req, res, next) {
  num = 0
  let book
  const form = formidable({ multiples: true })
  form
    .parse(req, (err, fields, files) => {
      console.log('111111')
      if (err) {
        next(err)
        return
      }
      //Аналіз полів

      // data.books.push({
      //   id: new Date().getTime(),
      //   title: fields.title,
      //   price: parseFloat(fields.price),
      //   photo: '/images/' + files.photo.originalFilename,
      // })

      //Створення об’єкта моделі
      book = {
        title: fields.title,
        price: parseFloat(fields.price),
      }
      req.body.id = fields.id
      req.body.book = book
      console.log('-------------------files.photo')
      console.log(files.photo.originalFilename)
      if (files.photo.originalFilename) {
        book.photo = '/images/' + files.photo.originalFilename
      }
    })
    .on('fileBegin', function (name, file) {
      console.log('222222')
      //Аналіз подій
      //Зміна розташування файлів
      if (file) file.filepath = req.imagesDir + '\\' + file.originalFilename
    })
  form.on('end', function (d) {
    console.log('3333333333')
    num++
    //Помилка модуля (викликається двічі)
    if (num == 1) {
      // fs.writeFileSync(req.dbDir + '/data.json', JSON.stringify(data))
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

          console.log('Обновленный объект', newBook)
          res.redirect('/books')
        }
      )
    }
  })
})

/* add-form GET */
router.get('/add-form', function (req, res, next) {
  res.render('booksForm', { title: 'New book' })
})

/* edit-form GET */
router.get('/edit-form/:id', function (req, res, next) {
  BookModel.findById(req.params.id, function (err, searchBook) {
    //mongoose.disconnect()
    if (err) return console.log(err)

    res.render('booksFormEdit', { title: 'Edit book', book: searchBook })
  })
})

/* add-form POST */
router.get('/add-form-post', function (req, res, next) {
  res.render('booksFormPost', { title: 'New book' })
})

/* edit-form GET */
router.get('/:id', function (req, res, next) {
  BookModel.findById(req.params.id, function (err, searchBook) {
    //mongoose.disconnect()
    if (err) return console.log(err)

    res.render('booksInfo', { title: 'Book info page', book: searchBook })
  })
})

module.exports = router
