import request from "supertest";
import { LeanDocument } from "mongoose";

import db from "../../../tests/db";
import app from "../../app";

import { query as statusQuery } from "../../services/db/status.db-mongo";
import { query as todosQuery } from "../../services/db/todos.db-mongo";
import { CreateStatusDocument, StatusDocument } from "../../models/Status.model";
import { CreateTodoDocument, TodoDocument } from "../../models/Todo.model";
import { getPathKindErrorMessage, getPathRequiredErrorMessage } from "./create-todo.command";

describe("Create todos", () => {
	let instance: any = null;

	beforeAll(async () => {
		instance = await db.getInstance();
	});

	beforeAll(async () => await db.connect(instance));
	afterEach(async () => await db.clearDatabase());
	afterAll(async () => await db.closeDatabase(instance));

	test("can not create a todo without name", async () => {
		const todo: CreateTodoDocument = {
			title: "",
			description: "bar",
			status: null,
		};

		const response = await request(app)
			.post("/todos")
			.send(todo);

		expect(response.statusCode).toEqual(400);
		expect(response.body.message).toEqual(getPathRequiredErrorMessage("title"));
	});

	test("can not create a todo with invalid status id", async () => {
		const todo: CreateTodoDocument = {
			title: "foo",
			description: "bar",
			status: "INVALID_STATUS_ID",
		};

		const response = await request(app)
			.post("/todos")
			.send(todo);

		expect(response.statusCode).toEqual(400);
		expect(response.body.message).toEqual(getPathKindErrorMessage("status"));
	});

	test("without records should return an empty array", async () => {
		const status: StatusDocument = (await statusQuery.create({
			name: "foo"
		} as CreateStatusDocument)) as StatusDocument;

		const todo: CreateTodoDocument = {
			title: "foo",
			description: "bar",
			status: status._id,
		};

		const response = await request(app)
			.post("/todos")
			.send(todo);

		expect(response.statusCode).toEqual(200);
		expect(response.body.title).toEqual(todo.title);
		expect(response.body.description).toEqual(todo.description);
		expect(response.body.status).toEqual(todo.status.toString());
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

		await todosQuery.create(todo);
		const records: LeanDocument<TodoDocument[]> = await todosQuery.getAll();

		const response = await request(app)
			.get("/todos")
			.send(records);

		expect(response.statusCode).toEqual(200);
		expect(response.body.length).toBe(1);
		expect(response.body).toMatchObject(JSON.parse(JSON.stringify(records)));
	});
});