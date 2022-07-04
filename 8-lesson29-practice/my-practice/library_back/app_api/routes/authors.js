var express = require("express");
var router = express.Router();

const authorsController = require("../controllers/authors");

/* GET список книг. */
router.get("/", authorsController.getList);

/* GET видалення книги за id. */
router.delete("/", authorsController.delete);

/* POST Створення нової книги. */
router.post("/", authorsController.add);

// Оновлення інформації про книгу після редагування
router.put("/", authorsController.update);

/* Відображення інформації про одну книгу */
router.get("/:id", authorsController.getById);

module.exports = router;
