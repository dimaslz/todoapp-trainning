import { NotificationService } from "@/app/components/notifications/notification.service";
import { CreateTodo, Todo, UpdateTodo } from "@/interfaces";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";

import { ApiService } from "../../services/api/api.service";

import {
  getTodos,
  getTodosSuccess,
  getTodosFailed,

  updateTodo,
  updateTodoSuccess,
  updateTodoFailed,

  createTodo,
  createTodoSuccess,
  createTodoFailed,

  deleteTodo,
  deleteTodoSuccess,
  deleteTodoFailed,
} from "./todos.actions";

@Injectable()
export class TodosEffects {

	getTodos$ = createEffect(() => this.actions$.pipe(
	  ofType(getTodos),
	  mergeMap(() => this.apiService.todos.getAll()
	      .pipe(
	        map(consult => getTodosSuccess({ data: consult })),
	        catchError(({ error }) => of(getTodosFailed({ error })))
	      ))
	));

	createTodo$ = createEffect(() => this.actions$.pipe(
	  ofType(createTodo),
	  mergeMap(({ todo }: { todo: CreateTodo }) => (
	    this.apiService.todos.create(todo)
	      .pipe(
	        map((data: Todo) => {
	          this.notificationsService.sendNotification("Task created!", { color: "green" });
	          return createTodoSuccess({ todo: data });
	        }),
	        catchError((error) => {
	          this.notificationsService.sendNotification(error);
	          return of(createTodoFailed({ error }));
	        })
	      ))
	  )
	));

	updateTodo$ = createEffect(() => this.actions$.pipe(
	  ofType(updateTodo),
	  mergeMap(({ todoId, todo }: { todoId: string; todo: UpdateTodo }) => (
	    this.apiService.todos.updateByID(todoId, todo)
	      .pipe(
	        map((data: Todo) => updateTodoSuccess({ todoId, todo: data })),
	        catchError((error) => of(updateTodoFailed({ error })))
	      ))
	  )
	));

	deleteTodo$ = createEffect(() => this.actions$.pipe(
	  ofType(deleteTodo),
	  mergeMap(({ todoId }: { todoId: string }) => (
	    this.apiService.todos.deleteByID(todoId)
	      .pipe(
	        map(() => deleteTodoSuccess({ todoId })),
	        catchError((error) => of(deleteTodoFailed({ error })))
	      ))
	  )
	));

	constructor(
		private actions$: Actions,
		private apiService: ApiService,
		private notificationsService: NotificationService,
	) {}
}
