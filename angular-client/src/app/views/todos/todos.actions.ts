import { CreateTodo, Todo, UpdateTodo } from "@/interfaces";
import { createAction, props } from "@ngrx/store";

export const GET_TODOS = '[Todos] Get todos';
export const GET_TODOS_SUCCESS = '[Todos] Get todos success';
export const GET_TODOS_FAILED = '[Todos] Get todos failed';

export const CREATE_TODO = '[Todos] Create todo';
export const CREATE_TODO_SUCCESS = '[Todos] Create todo success';
export const CREATE_TODO_FAILED = '[Todos] Create todo failed';

export const UPDATE_TODO = '[Todos] Update todo';
export const UPDATE_TODO_SUCCESS = '[Todos] Update todo success';
export const UPDATE_TODO_FAILED = '[Todos] Update todo failed';

export const DELETE_TODO = '[Todos] Delete todo';
export const DELETE_TODO_SUCCESS = '[Todos] Delete todo success';
export const DELETE_TODO_FAILED = '[Todos] Delete todo failed';

export const getTodos = createAction(
  GET_TODOS
);

export const getTodosSuccess = createAction(
  GET_TODOS_SUCCESS,
  props<{
		data: Todo[];
	}>()
);

export const getTodosFailed = createAction(
  GET_TODOS_FAILED,
  props<{
		error: string;
	}>()
);

export const createTodo = createAction(
  CREATE_TODO,
  props<{
		todo: CreateTodo;
	}>()
);

export const createTodoSuccess = createAction(
  CREATE_TODO_SUCCESS,
  props<{
		todo: Todo;
	}>()
);

export const createTodoFailed = createAction(
  CREATE_TODO_FAILED,
  props<{
		error: string;
	}>()
);

export const deleteTodo = createAction(
  DELETE_TODO,
  props<{
		todoId: string;
	}>()
);

export const deleteTodoSuccess = createAction(
  DELETE_TODO_SUCCESS,
  props<{
		todoId: string;
	}>()
);

export const deleteTodoFailed = createAction(
  DELETE_TODO_FAILED,
  props<{
		error: string;
	}>()
);

export const updateTodo = createAction(
  UPDATE_TODO,
  props<{
		todoId: string;
		todo: UpdateTodo;
	}>()
);

export const updateTodoSuccess = createAction(
  UPDATE_TODO_SUCCESS,
  props<{
    todoId: string;
		todo: Todo;
	}>()
);

export const updateTodoFailed = createAction(
  UPDATE_TODO_FAILED,
  props<{
		error: string;
	}>()
);
