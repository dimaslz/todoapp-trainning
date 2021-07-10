import { Response, Request } from "express";
import { LeanDocument } from "mongoose";
import { TodoDocument } from "../../models/Todo.model";
import { CreateTodoDocument } from "../../models/Todo.model";

import DbService from "../../services/db-handler.service";

export const getPathKindErrorMessage = (path: string) => (
	`path <${path}> should be a ObjectId type or null`
);

export const getPathRequiredErrorMessage = (path: string) => (
	`path <${path}> is required`
);

export default async (httpRequest: Request, httpResponse: Response) => {

	try {
		const todo = httpRequest.body as CreateTodoDocument;
		const newTodo: LeanDocument<TodoDocument> | any = await DbService
			.todos
			.create(todo);

		return httpResponse.status(200).json(newTodo);

	} catch ({ errors, message }) {
		if (errors.title?.kind === "required") {
			return httpResponse.status(400).json({
				message: getPathRequiredErrorMessage(errors.title.path)
			});
		}

		if (errors.status?.kind === "ObjectId") {
			return httpResponse.status(400).json({
				message: getPathKindErrorMessage(errors.status.path)
			});
		}

		return httpResponse.status(400).json({
			message
		});
	}
};