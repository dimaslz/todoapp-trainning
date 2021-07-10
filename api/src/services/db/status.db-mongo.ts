import StatusModel, { CreateStatusDocument, StatusDocument } from "../../models/Status.model";
import { LeanDocument, Query } from "mongoose";

export const query = {
	getAll: (query?: {}): Query<StatusDocument[], {}> => {
		return StatusModel.find(
			{...query},
			{
				__v: 0,
				createdAt: 0,
				updatedAt: 0,
			});
	},
	getByID: (statusId: string): Query<StatusDocument, {}> => {
		return StatusModel.findOne(
			{ _id: statusId },
			{
				__v: 0,
				createdAt: 0,
				updatedAt: 0,
			}
		);
	},
	create: async (status: CreateStatusDocument): Promise<LeanDocument<StatusDocument>> => {
		const newStatus: LeanDocument<StatusDocument> = (
			await StatusModel.create(status)
		).toObject({
			transform: (doc, ret) => {
				const { _id, name, description } = ret;
				return { _id, name, description };
			}
		});

		return newStatus;
	},
	updateByID: (statusId: string, status: CreateStatusDocument): Query<StatusDocument, {}> => {
		return StatusModel.findOneAndUpdate(
			{ _id: statusId },
			{ ...status },
			{ new: true }
		);
	}
};

export default query;