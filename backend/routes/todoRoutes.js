const express = require('express')
const router = express.Router();
const { createDB, createTable, createList, showTodos, singleTodo, updateTodo, deleteSingleTodo, createHistory, insertUpdate, singleHistory, showHistory } = require('../controllers/todoController');

// ROUTES
router.get('/create/database', createDB);
router.get('/create/table', createTable);
router.post('/create/list', createList);
router.get('/show/todos', showTodos);
router.get('/todo/:id', singleTodo);
router.put('/update/todo/:id', updateTodo);
router.delete('/delete/todo/:id', deleteSingleTodo);
router.get('/create/history', createHistory);
router.post('/insert/history',insertUpdate);
router.get('/history/:id', singleHistory);
router.get('/show/history',showHistory);

module.exports = router;