/* eslint-disable no-underscore-dangle */
import { CreateTodo, Todo } from "@/interfaces";
import { createReducer, on } from "@ngrx/store";

import {
  getTodos,
  getTodosFailed,
  getTodosSuccess,

  createTodo,
  createTodoFailed,
  createTodoSuccess,

  deleteTodo,
  deleteTodoSuccess,
  deleteTodoFailed,

  updateTodo,
  updateTodoSuccess,
  updateTodoFailed,
} from "./todos.actions";

export type Status = {
	loading: boolean;
  loaded: boolean;
  error: string | string[] | boolean | null;
};

export type TodosState = {
  items: Todo[];
  status: Status;
};

export const INITIAL_STATE: TodosState = {
  items: [],
  status: {
    loading: true,
    loaded: false,
    error: null,
  }
};

export const reducer = createReducer(
  { ...INITIAL_STATE },
  on(createTodo, (state) => {
    state = {
      ...state,
      status: {
        ...state.status,
        loaded: false,
        loading: true,
        error: null,
      }
    };

    return state;
  }),
  on(createTodoSuccess, (state, { todo }: { todo: Todo }) => {
    state = {
      ...state,
      status: {
        ...state.status,
        loaded: true,
        loading: false,
      },
      items: state.items.concat([todo])
    };

    return state;
  }),
  on(createTodoFailed, (state, { error }: { error: string }) => {
    state = {
      ...state,
      status: {
        ...state.status,
        loaded: true,
        loading: false,
        error,
      },
    };

    return state;
  }),

  on(getTodos, (state) => {
    state = {
      ...state,
      status: {
        ...state.status,
        loading: true,
      }
    };

    return state;
  }),
  on(getTodosSuccess, (state, { data }: { data: Todo[] }) => {
    state = {
      ...state,
      status: {
        ...state.status,
        loading: false,
      },
      items: data
    };

    return state;
  }),
  on(getTodosFailed, (state, { error }: any) => {
    state = {
      ...state,
      status: {
        ...state.status,
        loading: false,
        error,
      },
    };

    return state;
  }),

  on(updateTodo, (state) => {
    state = {
      ...state,
      status: {
        ...state.status,
        loading: true,
      }
    };

    return state;
  }),
  on(updateTodoSuccess, (state, { todoId, todo }: { todoId: string; todo: Todo }) => {
    state = {
      ...state,
      status: {
        ...state.status,
        loading: false,
      },
      items: state.items.map((item: Todo) => {
        if (item._id === todoId) {
          return todo;
        }

        return item;
      }),
    };

    return state;
  }),
  on(updateTodoFailed, (state, { error }: any) => {
    state = {
      ...state,
      status: {
        ...state.status,
        loading: false,
        error,
      },
    };

    return state;
  }),


  on(deleteTodo, (state) => {
    state = {
      ...state,
      status: {
        ...state.status,
        loading: true,
      }
    };

    return state;
  }),
  on(deleteTodoSuccess, (state, { todoId }: { todoId: string }) => {
    state = {
      ...state,
      status: {
        ...state.status,
        loading: false,
      },
      items: state.items.filter((item: Todo) => item._id !== todoId)
    };

    return state;
  }),
  on(deleteTodoFailed, (state, { error }: { error: string }) => {
    state = {
      ...state,
      status: {
        ...state.status,
        loading: false,
        error
      },
    };

    return state;
  }),
);
