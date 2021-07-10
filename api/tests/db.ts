import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";


const getInstance = () => MongoMemoryServer.create();

const connect = async (instance: any) => {
	const uri = await instance.getUri();
	const mongooseOpts = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		poolSize: 10,
	};

	await mongoose.connect(uri, mongooseOpts);
};

const closeDatabase = async (instance: any) => {
	await mongoose.connection.dropDatabase();
	await mongoose.connection.close();
	await instance.stop();
};

const clearDatabase = async () => {
	const collections = mongoose.connection.collections;

	for (const key in collections) {
		const collection = collections[key];
		await collection.deleteMany({});
	}
};

export default {
	getInstance,
	connect,
	closeDatabase,
	clearDatabase,
};