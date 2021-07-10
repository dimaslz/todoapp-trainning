import request from "supertest";

import db from "../../../tests/db";
import app from "../../app";

import { query as statusQuery } from "../../services/db/status.db-mongo";
import { query as todosQuery } from "../../services/db/todos.db-mongo";
import { CreateStatusDocument, StatusDocument } from "../../models/Status.model";
import { CreateTodoDocument, TodoDocument } from "../../models/Todo.model";
import { LeanDocument } from "mongoose";

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