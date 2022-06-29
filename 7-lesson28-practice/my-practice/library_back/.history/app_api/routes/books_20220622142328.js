var express = require('express')
var router = express.Router()

const booksController = require('../controllers/books')

const connectDb = require('../db')
connectDb() //<-- Встановлюємо з"єднання з базою

/* GET список книг. */
router.get('/', booksController.getList)

/* GET видалення книги за id. */
router.delete('/', booksController.delete)

/* POST Створення нової книги. */
router.post('/new', booksController.add)

// Оновлення інформації про книгу після редагування
router.post('/edit', booksController.update)

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
