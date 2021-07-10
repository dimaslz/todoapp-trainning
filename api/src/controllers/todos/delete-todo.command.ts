import { Response, Request } from "express";
import { TodoDocument } from "../../models/Todo.model";

import DbService from "../../services/db-handler.service";

export const get404ErrorMessage = (todoId: string) => {
	return `Record with id "${todoId}" does not exists`;
};

export const get400ErrorMessage = (path: string) => {
	return `Value of "${path}" should be an ObjectId`;
};
export default async (httpRequest: Request, httpResponse: Response) => {

	try {
		const { todoId } = httpRequest.params;

		const response: TodoDocument | null = await DbService
			.todos
			.deleteByID(todoId);

		if (!response) {
			return httpResponse.status(404).json({
				message: get404ErrorMessage(todoId)
			});
		}

		return httpResponse.status(204).json();

	} catch (err) {
		if (err.kind === "ObjectId") {
			return httpResponse.status(400).json({
				message: get400ErrorMessage(err.path)
			});
		}

		return httpResponse.status(500).json({
			message: err.message
		});
	}
};