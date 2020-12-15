var express = require('express');
var router = express.Router();
const bookController = require('../controllers/book_controller');

/* get routes*/
router.get('/',bookController.showDash);
router.get('/addBook', bookController.showAddBook);
router.get('/editBook/:id',bookController.editBook);
router.get('/deleteBook/:id',bookController.deleteBook);


/* post routes*/
router.post('/addBook', bookController.createBook);
router.post('/editBook/:id',bookController.editBooks);

module.exports = router;
