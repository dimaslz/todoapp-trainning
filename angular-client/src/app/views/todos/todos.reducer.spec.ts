import { CreateTodo, Todo } from '@/interfaces';
import * as Actions from './todos.actions';
import { reducer } from './todos.reducer';

describe('Todos reducer', () => {
  describe("get todos", () => {
    test('On -> getTodos', () => {
      const action = Actions.getTodos();
      const result = reducer({
        items: [],
        status: {
          loading: true,
          loaded: false,
          error: false,
        }
      }, action);

      expect(result).toMatchSnapshot();
    });

    test('On -> getTodosSuccess', () => {
      const todos: Todo[] = [{
        _id: "",
        title: "",
        description: "",
        status: {
          _id: "",
          name: "",
        },
      }];

      const action = Actions.getTodosSuccess({
        data: todos
      });

      const result = reducer({
        items: todos,
        status: {
          loading: false,
          loaded: true,
          error: false,
        }
      }, action);

      expect(result).toMatchSnapshot();
    });

    test('On -> getTodosFailed', () => {
      const error = "Something happen";

      const action = Actions.getTodosFailed({ error });

      const result = reducer({
        items: [],
        status: {
          loading: false,
          loaded: true,
          error,
        }
      }, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe("create todo", () => {
    test('On -> createTodo', () => {
      const todo: CreateTodo = {
        title: "foo",
      };

      const action = Actions.createTodo({ todo });
      const result = reducer({
        items: [],
        status: {
          loading: true,
          loaded: false,
          error: false,
        }
      }, action);

      expect(result).toMatchSnapshot();
    });

    test('On -> createTodoSuccess', () => {
      const todo: Todo = {
        _id: "",
        title: "",
        description: "",
        status: {
          _id: "",
          name: "",
        },
      };

      const action = Actions.createTodoSuccess({
        todo,
      });

      const result = reducer({
        items: [todo],
        status: {
          loading: false,
          loaded: true,
          error: false,
        }
      }, action);

      expect(result).toMatchSnapshot();
    });

    test('On -> createTodoFailed', () => {
      const error = "Something happen";

      const action = Actions.createTodoFailed({ error });

      const result = reducer({
        items: [],
        status: {
          loading: false,
          loaded: true,
          error,
        }
      }, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe("delete todo", () => {
    test('On -> deleteTodo', () => {
      const action = Actions.deleteTodo({ todoId: "todoId" });
      const result = reducer({
        items: [{
          _id: "todoId",
          title: "",
          description: "",
          status: {
            _id: "",
            name: "",
          },
        }],
        status: {
          loading: true,
          loaded: false,
          error: false,
        }
      }, action);

      expect(result).toMatchSnapshot();
    });

    test('On -> deleteTodoSuccess', () => {
      const action = Actions.deleteTodoSuccess({ todoId: "todoId" });
      const result = reducer({
        items: [{
          _id: "todoId",
          title: "",
          description: "",
          status: {
            _id: "",
            name: "",
          },
        }],
        status: {
          loading: true,
          loaded: false,
          error: false,
        }
      }, action);

      expect(result.items).toMatchObject([]);
    });

    test('On -> deleteTodoFailed', () => {
      const error = "error!";
      const action = Actions.deleteTodoFailed({ error });
      const items = [{
        _id: "todoId",
        title: "",
        description: "",
        status: {
          _id: "",
          name: "",
        },
      }];
      const result = reducer({
        items,
        status: {
          loading: false,
          loaded: true,
          error: false,
        }
      }, action);

      expect(result.items).toMatchObject(items);
      expect(result.status.error).toBe(error);
    });
  });

  describe("update todo", () => {
    test('On -> deleteTodo', () => {
      const action = Actions.updateTodo({
        todoId: "todoId",
        todo: {
          title: "new title",
        }
      });

      const result = reducer({
        items: [{
          _id: "todoId",
          title: "",
          description: "",
          status: {
            _id: "",
            name: "",
          },
        }],
        status: {
          loading: true,
          loaded: false,
          error: false,
        }
      }, action);

      expect(result).toMatchSnapshot();
    });

    test('On -> updateTodoSuccess', () => {
      const todo: Todo = {
        _id: "todoId",
        title: "new title",
        description: "",
        status: {
          _id: "",
          name: "",
        },
      };

      const action = Actions.updateTodoSuccess({
        todoId: "todoId",
        todo
      });
      const result = reducer({
        items: [{
          _id: "todoId",
          title: "",
          description: "",
          status: {
            _id: "",
            name: "",
          },
        }],
        status: {
          loading: false,
          loaded: true,
          error: false,
        }
      }, action);

      expect(result.items[0]).toMatchObject(todo);
    });

    test('On -> updateTodoFailed', () => {
      const error = "error!";
      const action = Actions.updateTodoFailed({ error });
      const items = [{
        _id: "todoId",
        title: "",
        description: "",
        status: {
          _id: "",
          name: "",
        },
      }];
      const result = reducer({
        items,
        status: {
          loading: false,
          loaded: true,
          error: false,
        }
      }, action);

      expect(result.items).toMatchObject(items);
      expect(result.status.error).toBe(error);
    });
  });
});
