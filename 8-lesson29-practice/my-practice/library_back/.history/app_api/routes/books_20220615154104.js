var express = require('express')
var router = express.Router()

const formidable = require('formidable')
const BookModel = require('../models/book') //<--Імпортуємо модель

const connectDb = require('../db')
connectDb() //<-- Встановлюємо з"єднання з базою

/* GET список книг. */
router.get('/', function (req, res, next) {
  const searchObj = {}
  if (req.query.searchTitle) searchObj.title = req.query.searchTitle //<--Якщо є параметри пошуку, то включаємо у об"єкт пошуку

  BookModel.find(searchObj, function (err, books) {
    //<-- Здійснюємо пошук
    // mongoose.disconnect()
    if (err) return res.status(500).json({ err: { msg: 'Fetch faild!' } })
    if (searchObj.title)
      res.render('booksListOnly', {
        books,
      })
    //<--Якщо був параметр пошуку, то надсилаємо лише список книг
    else res.render('booksList', { title: 'Books', books }) //<--В іншоиму випадку, надсилаємо усю сторінку

    // res.status(200).json({books });  //<--Можемо також надсилати лише дані, а на фронті зробити виведення
  })
})

/* GET видалення книги за id. */
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

/* POST Створення нової книги. */
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

// Оновлення інформації про книгу після редагування
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

      //Створення об’єкта моделі
      book = {
        title: fields.title,
        price: parseFloat(fields.price),
      }
      req.body.id = fields.id
      req.body.book = book

      if (files.photo.originalFilename) {
        //Якщо надіслано нове фото, то змінюємо поле фото
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
})

/* add-form GET */
router.get('/add-form', function (req, res, next) {
  res.render('booksForm', { title: 'New book' })
})

/* edit-form Для відображення форми для редагування */
router.get('/edit-form/:id', function (req, res, next) {
  //Пошук об"єкта-книги за id
  BookModel.findById(req.params.id, function (err, searchBook) {
    //mongoose.disconnect()
    if (err) return console.log(err)

    res.render('booksFormEdit', { title: 'Edit book', book: searchBook })
  })
})

/* add-form POST Для отримання форми створення нової книги */
router.get('/add-form-post', function (req, res, next) {
  res.render('booksFormPost', { title: 'New book' })
})

/* Відображення інформації про одну книгу */
router.get('/:id', function (req, res, next) {
  BookModel.findById(req.params.id, function (err, searchBook) {
    //mongoose.disconnect()
    if (err) return console.log(err)

    res.render('booksInfo', { title: 'Book info page', book: searchBook })
  })
})

module.exports = router
