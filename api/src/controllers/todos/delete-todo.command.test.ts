import request from "supertest";
import { LeanDocument, Types } from "mongoose";

import db from "../../../tests/db";
import app from "../../app";

import { query as statusQuery } from "../../services/db/status.db-mongo";
import { query as todosQuery } from "../../services/db/todos.db-mongo";
import { CreateStatusDocument, StatusDocument } from "../../models/Status.model";
import { CreateTodoDocument, TodoDocument } from "../../models/Todo.model";
import { get400ErrorMessage, get404ErrorMessage } from "./delete-todo.command";

describe("Get todos", () => {
	let instance: any = null;

	beforeAll(async () => {
		instance = await db.getInstance();
	});

	beforeAll(async () => await db.connect(instance));
	afterEach(async () => await db.clearDatabase());
	afterAll(async () => await db.closeDatabase(instance));

	describe("deleting a record", () => {
		let response: any;
		beforeEach(async () => {
			const status: StatusDocument = (await statusQuery.create({
			name: "foo"
		} as CreateStatusDocument)) as StatusDocument;

		const todo: CreateTodoDocument = {
			title: "foo",
			description: "bar",
			status: status._id,
		};

		const newTodo: LeanDocument<TodoDocument> = await todosQuery.create(todo);

		const todoId = newTodo._id;
		response = await request(app)
			.delete(`/todos/${todoId}`);
		});

		describe("should return", () => {
			test("status code 204", () => {
				expect(response.statusCode).toEqual(204);
			});
			test("empty body", () => {
				expect(response.body).toEqual({});
			});
		});
	});

	describe("if todoId should be an ObjectId", () => {
		test("should return an error 500 and message", async () => {
			const response = await request(app)
				.delete("/todos/todoId");

			expect(response.statusCode).toEqual(400);
			expect(response.body).toEqual({
				message: get400ErrorMessage("_id")
			});
		});
	});

	describe("if todoId does not exist", () => {
		test("should return status 404 with a message", async () => {
			const todoId = Types.ObjectId();
			const response = await request(app)
				.delete(`/todos/${todoId}`);

			expect(response.statusCode).toEqual(404);
			expect(response.body).toEqual({
				message: get404ErrorMessage(todoId.toHexString())
			});
		});
	});


});