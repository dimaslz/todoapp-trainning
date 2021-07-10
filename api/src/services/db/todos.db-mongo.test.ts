import { LeanDocument } from "mongoose";
import db from "../../../tests/db";
import { CreateStatusDocument, StatusDocument } from "../../models/Status.model";
import { CreateTodoDocument, TodoDocument } from "../../models/Todo.model";
import { query as statusQuery } from "./status.db-mongo";
import { query } from "./todos.db-mongo";

describe("Todos mongo db", () => {
	let instance: any = null;

	beforeAll(async () => {
		instance = await db.getInstance();
	});

	beforeAll(async () => await db.connect(instance));
	afterEach(async () => await db.clearDatabase());
	afterAll(async () => await db.closeDatabase(instance));

	describe("getting data without records", () => {
		test("should return empty array", async () => {
			const todos = await query.getAll();

			expect(todos).toMatchObject([]);
		});
	});

	describe("after create a record", () => {
		let todos: TodoDocument[];
		let todo: CreateTodoDocument;
		let status: StatusDocument;

		beforeEach(async () => {
			status = (await statusQuery.create({
				name: "foo"
			} as CreateStatusDocument)) as StatusDocument;

			todo = {
				title: "foo",
				description: "bar",
				status: status._id,
			};

			await query.create(todo);
			todos = await query.getAll();
		});

		describe("on get records should return", () => {
			test("1 record", () => expect(todos.length).toBe(1));
			test("same title", () => expect(todos[0].title).toEqual(todo.title));
			test("same description", () => expect(todos[0].description).toEqual(todo.description));
			test("same status", () => expect(todos[0].status).toMatchObject(status));
		});

		describe("on get a record by id should return", () => {
			let record: TodoDocument;
			beforeEach(async () => {
				record = await query.getByID(todos[0]._id);
			});

			test("same title", () => expect(todos[0].title).toEqual(record.title));
			test("same description", () => expect(todos[0].description).toEqual(record.description));
			test("same status", () => expect(todos[0].status).toMatchObject(status));
		});

		describe("on update a record should return", () => {
			let updated: LeanDocument<TodoDocument>;
			let record: TodoDocument;
			beforeEach(async () => {
				todo = {
					title: "FOO",
					description: "BAR",
				};
				updated = await query.updateByID(todos[0]._id, todo);
				record = await query.getByID(todos[0]._id);
			});

			describe("should return updated record", () => {
				test("updated title", () => expect(updated.title).toEqual(todo.title));
				test("updated description", () => expect(updated.description).toEqual(todo.description));
			});

			describe("on get record by id should return updated record", () => {
				test("record updated title", () => expect(updated.title).toEqual(record.title));
				test("record updated description", () => expect(updated.description).toEqual(record.description));
			});
		});

		describe("on delete a record", () => {
			beforeEach(async () => {
				await query.deleteByID(todos[0]._id);
				todos = await query.getAll();
			});

			test("should return an empty array", async () => {
				todos = await query.getAll({ delete: false });
				expect(todos).toMatchObject([]);
			});
		});
	});
});