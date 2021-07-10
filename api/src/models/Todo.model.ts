import mongoose from "mongoose";

export type CreateTodoDocument = {
    title: string;
    description?: string;
    delete?: boolean;
    status?: string;
};

export type TodoDocument = mongoose.Document & {
    _id: string;
    title: string;
    description?: string;
    delete?: boolean;
    status?: string;
};

export const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    delete: { type: Boolean, default: false },
    status: { type: mongoose.Schema.Types.ObjectId, ref: "status", default: null },
}, { timestamps: true });

export default mongoose.model<TodoDocument>("todo", todoSchema);
