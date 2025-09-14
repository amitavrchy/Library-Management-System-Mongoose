import mongoose, { model, Schema } from "mongoose";

export interface Ibook{
    _id: mongoose.Types.ObjectId
    title: string,
    author: string,
    genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY",
    isbn: string,
    description?: string,
    copies: number,
    available: boolean,
}

const BookSchema: Schema<Ibook> = new Schema({
    title : {
        type: String,
        required: true,
        trim: true
    },
    author : {
        type: String,
        required: true,
        trim: true
    },
    genre : {
        type: String,
        required: true,
        enum: ["Fiction", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
    },
    isbn : {
        type: String,
        required: true,
        trim: true
    },
    description : {
        type: String
    },
    copies : {
        type: Number,
        required: true,
        min: 0
    },
    available: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true
}
)

export default model<Ibook>("Book", BookSchema)