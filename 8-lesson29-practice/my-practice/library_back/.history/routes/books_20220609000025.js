var express = require('express')
var router = express.Router()
var path = require('path')
const fs = require('fs')
const formidable = require('formidable')

const data = require('../db/data.json')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('booksList', { title: 'Express', books: data.books })
})

/* GET home page. */
router.delete('/', function (req, res, next) {
  console.log('delete--------------------------')
  console.log(req.body.id)
  data.books = data.books.filter((item) => item.id != req.body.id)

  fs.writeFileSync(req.dbDir + '/data.json', JSON.stringify(data))

  // res.redirect('/')
  res.send({ success: true })
})
/* GET home page. */
router.get('/new', function (req, res, next) {
  data.books.push({
    id: new Date().getTime(),
    title: req.query.title,
    price: parseFloat(req.query.price),
    photo: req.query.photo,
  })

  fs.writeFileSync(req.dbDir + '/data.json', JSON.stringify(data))
  res.redirect('/books')
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

      data.books.push({
        id: new Date().getTime(),
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
      fs.writeFileSync(req.dbDir + '/data.json', JSON.stringify(data))
      res.redirect('/books')
    }
  })
})
/* add-form GET */
router.get('/add-form', function (req, res, next) {
  res.render('booksForm', { title: 'New book' })
})
/* add-form POST */
router.get('/add-form-post', function (req, res, next) {
  res.render('booksFormPost', { title: 'New book' })
})

module.exports = router
