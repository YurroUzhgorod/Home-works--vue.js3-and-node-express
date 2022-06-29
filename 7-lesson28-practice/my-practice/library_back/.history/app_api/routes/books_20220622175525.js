var express = require('express')
var router = express.Router()

const booksController = require('../controllers/books')

/* GET список книг. */
router.get('/', booksController.getList)

/* GET видалення книги за id. */
router.delete('/', booksController.delete)

/* POST Створення нової книги. */
router.post('/', booksController.add)

// Оновлення інформації про книгу після редагування
router.put('/', booksController.update)

/* Відображення інформації про одну книгу */
router.get('/:id', booksController.getById)

module.exports = router
