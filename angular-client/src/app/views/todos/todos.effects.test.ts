import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Actions } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { TodosEffects } from "./todos.effects";
import { ApiService } from "@/app/services/api/api.service";
import { hot, cold } from "jest-marbles";
import * as TodosActions from "./todos.actions";
import { Todo } from "@/interfaces";

describe("Todos Effects", () => {
  let actions$: Observable<any>;
  let effects: TodosEffects;
  let apiService: ApiService;
  const provide = (mock: any): any => mock;

  const getAll = jest.fn();
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodosEffects,
        provideMockActions(() => actions$),
        {
          provide: ApiService,
          useValue: {
            todos: {
              getAll,
            }
          }
        }
      ]
    });

    effects = TestBed.inject(TodosEffects);
    apiService = TestBed.inject(ApiService);
    actions$ = TestBed.inject(Actions);
  });

  describe("Get todos", () => {
    it('Success', () => {
      const todos: Todo[] = [{
        _id: "",
        title: "",
        description: "",
        status: {
          _id: "",
          name: "",
        },
      }];
      const action = TodosActions.getTodos();
      const completion = TodosActions.getTodosSuccess({
        data: todos
      });

      actions$ = hot('-a', { a: action });
      const response = cold('-a|', { a: todos });
      const expected = cold('--c', { c: completion });
      apiService.todos.getAll = jest.fn(() => response);

      expect(effects.getTodos$).toBeObservable(expected);
    });

    it('Error', () => {
      const action = TodosActions.getTodos();
      const error = "Something happen";

      const completion = TodosActions.getTodosFailed({ error });

      actions$ = hot('-a', { a: action });
      const response = cold('-#', {}, { error });
      const expected = cold('--b', { b: completion });
      apiService.todos.getAll = jest.fn(() => response);

      expect(effects.getTodos$).toBeObservable(expected);
    });
  });
});
