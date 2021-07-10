import request from "supertest";
import { LeanDocument, Types } from "mongoose";

import db from "../../../tests/db";
import app from "../../app";

import { query as statusQuery } from "../../services/db/status.db-mongo";
import { query as todosQuery } from "../../services/db/todos.db-mongo";
import { CreateStatusDocument, StatusDocument } from "../../models/Status.model";
import { CreateTodoDocument, TodoDocument } from "../../models/Todo.model";
import { getPathKindErrorMessage, error404Message } from "./update-todo-by-id.command";

describe("Create todos", () => {
	let instance: any = null;

	beforeAll(async () => {
		instance = await db.getInstance();
	});

	beforeAll(async () => await db.connect(instance));
	afterEach(async () => await db.clearDatabase());
	afterAll(async () => await db.closeDatabase(instance));

	test("can not update a todo with invalid status id", async () => {
		const status: StatusDocument = (await statusQuery.create({
			name: "foo"
		} as CreateStatusDocument)) as StatusDocument;

		const todo: CreateTodoDocument = {
			title: "foo",
			description: "bar",
			status: status._id,
		};

		const newTodo: LeanDocument<TodoDocument> = await todosQuery.create(todo);

		const updateTodo = {
			status: "INVALID_STATUS_ID",
		};

		const response = await request(app)
			.put(`/todos/${newTodo._id}`)
			.send(updateTodo);

		expect(response.statusCode).toEqual(400);
		expect(response.body.message).toEqual(getPathKindErrorMessage("status"));
	});

	describe("on update a record", () => {
		let response: any;
		const newTitle = "title updated";
		const newDescription = "description updated";

		beforeAll(async () => {
			const status: StatusDocument = (await statusQuery.create({
				name: "foo"
			} as CreateStatusDocument)) as StatusDocument;

			const todo: CreateTodoDocument = {
				title: "foo",
				description: "bar",
				status: status._id,
			};

			const newTodo: LeanDocument<TodoDocument> = await todosQuery.create(todo);

			response = await request(app)
				.put(`/todos/${newTodo._id}`)
				.send({
					title: newTitle,
					description: newDescription,
				});
		});

		test("status code 200", () => {
			expect(response.statusCode).toEqual(200);
		});

		test("title should be updated", () => {
			expect(response.body.title).toBe(newTitle);
		});

		test("description should be updated", () => {
			expect(response.body.description).toBe(newDescription);
		});
	});

	test("when the record does not exist, should return 404 and error message", async () => {
		const todoId: any = Types.ObjectId();

		const response = await request(app)
			.put(`/todos/${todoId}`)
			.send({});

		expect(response.statusCode).toEqual(404);
		expect(response.body.message).toBe(error404Message(todoId));
	});
});