import { Response, Request } from "express";
import { LeanDocument } from "mongoose";
import { TodoDocument } from "../../models/Todo.model";
import { CreateTodoDocument } from "../../models/Todo.model";

import DbService from "../../services/db-handler.service";

export const getPathRequiredErrorMessage = (path: string) => (
	`path <${path}> is required`
);

export const getPathKindErrorMessage = (path: string) => (
	`path <${path}> should be a ObjectId type or null`
);

export const error404Message = (id: string) => `Does not exist a record with id: ${id}`;

export default async (httpRequest: Request, httpResponse: Response) => {

	try {
		const { todoId } = httpRequest.params;
		const todoUpdated = httpRequest.body as CreateTodoDocument;

		const todo: LeanDocument<TodoDocument> = await DbService
			.todos
			.updateByID(todoId, todoUpdated);

		if (!todo) {
			return httpResponse.status(404).json({
				message: error404Message(todoId)
			});
		}

		return httpResponse.status(200).json(todo);

	} catch ({ message, kind, path }) {
		if (kind === "ObjectId") {
			return httpResponse.status(400).json({
				message: getPathKindErrorMessage(path)
			});
		}

		return httpResponse.status(400).json({
			message
		});
	}
};