import mongoose, { model, Schema } from "mongoose";
import Book, { Ibook } from "./Book";

export interface IBorrow {
    book: Ibook["_id"],
    quantity: number,
    dueDate: Date
}

const BorrowSchema = new Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Book",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    dueDate: {
        type: Date,
        required: true
    }
},
{
    timestamps: true
})

BorrowSchema.pre("save", async function (next) {
    const book = await Book.findById(this.book)
    if(!book){
        return next(new Error("Book not found"));
    }
    if(book.copies < this.quantity){
        return next(new Error("Not enough"));
    }
})

export default model<IBorrow>("Borrow", BorrowSchema)