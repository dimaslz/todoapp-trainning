import { CreateTodo, Todo } from '@/interfaces';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import * as Actions from './todos.actions';

@Component({
  selector: 'app-todos',
  templateUrl: 'todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit, OnDestroy {
  public loading = true;
  public canCreate = false;
  public form = new FormGroup({
    title: new FormControl("", Validators.required),
  });

  public todos: Todo[] = [];

  private formSubscription: Subscription | null = null;
  private storeSubscription: Subscription | null = null;

  constructor(
    private store$: Store<any>,
  ) { }

  ngOnInit(): void {
    this.getTodos();

    this.formSubscription = this.form.valueChanges.subscribe(({ title }) => {
      this.canCreate = !!title;
    });

    this.storeSubscription = this.store$.pipe(
      select('todos'),
      filter(({ status }: any) => !status.loading),
      // filter(({ status }: any) => status.loaded)
    ).subscribe(({ items, status }: { items: Todo[]; status: any }) => {
      this.loading = status.loading;
      this.todos = items;
    });
  }

  ngOnDestroy(): void {
    this.storeSubscription?.unsubscribe();
    this.formSubscription?.unsubscribe();
  }

  createTodo(todo: CreateTodo): void {
    this.store$.dispatch(
      Actions.createTodo({
        todo,
      })
    );

    this.form.reset();
  }

  deleteTodo(todoId: string): void {
    this.store$.dispatch(
      Actions.deleteTodo({
        todoId,
      })
    );

    this.form.reset();
  }

  getTodos(): void {
    this.store$.dispatch(
      Actions.getTodos(),
    );
  }

  onSubmit(): void {
    const { title } = this.form.controls;

    const todo: CreateTodo = {
      title: title.value
    };

    this.createTodo(todo);
  }

  getTodoID(index: number, todo: any): any {
    return todo._id;
  }
}
