import { Response, Request } from "express";
import { TodoDocument } from "../../models/Todo.model";

import DbService from "../../services/db-handler.service";

export const error404Message = (id: string) => `Does not exist a record with id: ${id}`;

export default async (httpRequest: Request, httpResponse: Response) => {

	try {
		const { todoId } = httpRequest.params;
		const todo: TodoDocument = await DbService.todos.getByID(todoId);

		if (!todo) {
			return httpResponse.status(404).json({
				message: error404Message(todoId)
			});
		}

		return httpResponse.status(200).json(todo);

	} catch (err) {
		console.error(err);
	}
};