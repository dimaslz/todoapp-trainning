import mongoose from "mongoose";

export type CreateStatusDocument = mongoose.Document & {
    name: string;
    description?: string;
};

export type StatusDocument = mongoose.Document & {
    _id: string;
    name: string;
    description?: string;
};

export const statusSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
}, { timestamps: true });

export default mongoose.model<StatusDocument>("status", statusSchema);
