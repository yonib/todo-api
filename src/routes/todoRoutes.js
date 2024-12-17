const express = require('express');
const router = express.Router();
const {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
} = require('../controllers/todoController');

/**
 * @swagger
 * /todos:
 *   get:
 *     description: Get all TODOs
 *     responses:
 *       200:
 *         description: List of TODOs
 */
router.get('/', getTodos);

/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     description: Get a TODO by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The TODO ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The TODO
 */
router.get('/:id', getTodoById);

/**
 * @swagger
 * /todos:
 *   post:
 *     description: Create a new TODO
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: TODO created
 */
router.post('/', createTodo);

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     description: Update a TODO by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The TODO ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: TODO updated
 */
router.put('/:id', updateTodo);

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     description: Delete a TODO by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The TODO ID
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: TODO deleted
 */
router.delete('/:id', deleteTodo);

module.exports = router;
