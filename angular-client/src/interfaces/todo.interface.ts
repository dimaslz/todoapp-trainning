export type Todo = {
  _id: string;
  title: string;
  description: string;
  status: {
    _id: string;
    name: string;
  };
};

export type CreateTodo = {
  title?: string;
  description?: string;
  status?: string;
};

export type UpdateTodo = {
  title?: string;
  description?: string;
  status?: string;
};
