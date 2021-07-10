import { LeanDocument, Types } from "mongoose";
import request from "supertest";

import db from "../../../tests/db";
import app from "../../app";

import { query as statusQuery } from "../../services/db/status.db-mongo";
import { query as todosQuery } from "../../services/db/todos.db-mongo";
import { CreateStatusDocument, StatusDocument } from "../../models/Status.model";
import { CreateTodoDocument, TodoDocument } from "../../models/Todo.model";

import { error404Message } from "./get-todo-by-id.query";

describe("Get todos", () => {
	let instance: any = null;

	beforeAll(async () => {
		instance = await db.getInstance();
	});

	beforeAll(async () => await db.connect(instance));
	afterEach(async () => await db.clearDatabase());
	afterAll(async () => await db.closeDatabase(instance));

	test("without records should return an empty array", async () => {
		const response = await request(app)
			.get("/todos");

		expect(response.statusCode).toEqual(200);
		expect(response.body).toEqual([]);
	});

	test("with records should return an array of records", async () => {
		const status: StatusDocument = (await statusQuery.create({
			name: "foo"
		} as CreateStatusDocument)) as StatusDocument;

		const todo: CreateTodoDocument = {
			title: "foo",
			description: "bar",
			status: status._id,
		};

		const newTodo: LeanDocument<TodoDocument> = await todosQuery.create(todo);

		const response = await request(app)
			.get(`/todos/${newTodo._id}`)
			.send(newTodo);

		expect(response.statusCode).toEqual(200);
		expect(response.body._id).toBe(newTodo._id.toString());
		expect(response.body.title).toBe(newTodo.title);
		expect(response.body.description).toBe(newTodo.description);
		expect(response.body.status._id).toBe(newTodo.status.toString());
	});

	test("when the record does not exist, should return 404 and error message", async () => {
		const todoId: any = Types.ObjectId();
		const response = await request(app)
			.get(`/todos/${todoId}`);

		expect(response.statusCode).toEqual(404);
		expect(response.body.message).toBe(error404Message(todoId));
	});
});