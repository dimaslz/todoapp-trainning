import express from "express";

import GetTodos from "./get-todos.query";
import GetTodoByID from "./get-todo-by-id.query";
import CreateTodos from "./create-todo.command";
import DeleteTodo from "./delete-todo.command";
import UpdateTodo from "./update-todo-by-id.command";

const consults = express();
const router = express.Router();

/**
 * GET /
 * Get todos
 */
router.get("/", GetTodos);

/**
 * GET /
 * Get todo by id
 */
router.get("/:todoId", GetTodoByID);

/**
 * POST /
 * Create todo
 */
router.post("/", CreateTodos);

/**
 * PUT /
 * Update todo
 */
router.put("/:todoId", UpdateTodo);

/**
 * DELETE /
 * Delete todo
 */
router.delete("/:todoId", DeleteTodo);

consults.use(router);
export default consults;