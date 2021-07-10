import { Response, Request } from "express";
import { TodoDocument } from "../../models/Todo.model";

import DbService from "../../services/db-handler.service";
export default async (httpRequest: Request, httpResponse: Response) => {

	try {
		const todos: TodoDocument[] = await DbService.todos.getAll();
		return httpResponse.status(200).json(todos);

	} catch (err) {
		return httpResponse.status(500).json({
			message: "Something happen. Try again!",
			errorMessage: err.message
		});
	}
};