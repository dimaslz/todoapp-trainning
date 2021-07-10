import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { environment } from '@/environments/environment';
import { of } from 'rxjs';
import { Todo, CreateTodo } from '@/interfaces';

describe('ApiService', () => {
  let apiService: ApiService;
  const provide = (mock: any): any => mock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    apiService = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(apiService).toBeTruthy();
  });

  describe('Todos', () => {
    test("getAll() -> /todos", (done) => {
      const http = { get: jest.fn(() => of([])) };
      apiService = new ApiService(provide(http));

      apiService.todos.getAll().subscribe(data => {
        expect(http.get).toBeCalledWith(`${environment.apiUrl}/todos`);
        expect(data.length).toBe(0);
        done();
      });
    });

    test("getByID(todoId) -> /todos/:todoId", (done) => {
      const http = { get: jest.fn(() => of({})) };
      apiService = new ApiService(provide(http));

      apiService.todos.getByID('todoId').subscribe(data => {
        expect(http.get).toBeCalledWith(`${environment.apiUrl}/todos/todoId`);
        expect(data).toMatchObject({});
        done();
      });
    });

    test("create(todo) -> /todos", (done) => {
      const createTodo: CreateTodo = {
        title: "foo",
        description: "bar",
      };
      const todo: Todo = {
        ...JSON.parse(JSON.stringify(createTodo)),
        _id: "the_id",
        status: {
          _id: "the_status_id",
          name: "done"
        },
      };

      const http = { post: jest.fn(() => of(todo)) };
      apiService = new ApiService(provide(http));

      apiService.todos.create(createTodo).subscribe(data => {
        expect(http.post).toBeCalledWith(
          `${environment.apiUrl}/todos`,
          { description: "bar", title: "foo" }
        );

        expect(data._id).toEqual(todo._id);
        expect(data.title).toEqual(todo.title);
        expect(data.description).toEqual(todo.description);
        expect(data.status._id).toEqual(todo.status._id);
        expect(data.status.name).toEqual(todo.status.name);

        done();
      });
    });

    test("updateByID(todoId, todo) -> /todos/todoId", (done) => {
      const createTodo: CreateTodo = {
        title: "foo",
        description: "bar",
      };
      const todo: Todo = {
        ...JSON.parse(JSON.stringify(createTodo)),
        _id: "the_id",
        status: {
          _id: "the_status_id",
          name: "done"
        },
      };

      const http = { put: jest.fn(() => of(todo)) };
      apiService = new ApiService(provide(http));

      apiService.todos.updateByID("TODO_ID", createTodo).subscribe(data => {
        expect(http.put).toBeCalledWith(
          `${environment.apiUrl}/todos/TODO_ID`,
          { description: "bar", title: "foo" }
        );

        expect(data._id).toEqual(todo._id);
        expect(data.title).toEqual(todo.title);
        expect(data.description).toEqual(todo.description);
        expect(data.status._id).toEqual(todo.status._id);
        expect(data.status.name).toEqual(todo.status.name);

        done();
      });
    });

    test("deleteByID(todoId) -> /todos/todoId", (done) => {
      const http = { delete: jest.fn(() => of({})) };
      apiService = new ApiService(provide(http));

      apiService.todos.deleteByID("TODO_ID").subscribe(data => {
        expect(http.delete).toBeCalledWith(
          `${environment.apiUrl}/todos/TODO_ID`, {}
        );

        expect(data).toEqual({});

        done();
      });
    });
  });
});

