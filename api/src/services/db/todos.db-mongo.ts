import TodoModel, { CreateTodoDocument, TodoDocument } from "../../models/Todo.model";
import StatusModel from "../../models/Status.model";
import { LeanDocument, Query } from "mongoose";

export const query = {
	getAll: (query = { delete: false }): Query<TodoDocument[], {}> => {
		return TodoModel.find(
			{...query},
			{
				__v: 0,
				createdAt: 0,
				updatedAt: 0,
			})
		.populate({
			path: "status",
			model: StatusModel,
			select: {
				__v: 0,
				createdAt: 0,
				updatedAt: 0,
			}
		});
	},
	getByID: (todoId: string): Query<TodoDocument, {}> => {
		return TodoModel.findOne(
			{ _id: todoId },
			{
				__v: 0,
				createdAt: 0,
				updatedAt: 0,
			}
		).populate({
			path: "status",
			model: StatusModel,
			select: {
				__v: 0,
				createdAt: 0,
				updatedAt: 0,
			}
		});
	},
	deleteByID: async (todoId: string): Promise<TodoDocument> => {
		return await TodoModel.findOneAndUpdate(
			{ _id: todoId },
			{ delete: true },
		);
	},
	create: async (todo: CreateTodoDocument): Promise<LeanDocument<TodoDocument>> => {
		const newTodo: LeanDocument<TodoDocument> = (await TodoModel.create(todo))
			.toObject({
				transform: (doc, ret) => {
					const { _id, title, description, status = null } = ret;
					return { _id, title, description, status };
				}
			});

		return newTodo;
	},
	updateByID: async (todoId: string, todo: CreateTodoDocument): Promise<LeanDocument<TodoDocument>> => {
		const newTodo: TodoDocument = (await TodoModel.findOneAndUpdate(
			{ _id: todoId },
			{ ...todo },
			{ new: true, }
		));

		if (!newTodo) return null;

		return newTodo.toObject({
			transform: (doc, ret) => {
				const { _id, title, description, status } = ret;
				return { _id, title, description, status };
			}
		});
	}
};

export default query;