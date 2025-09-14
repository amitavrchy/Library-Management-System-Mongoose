import { Ibook } from "./Book";

export interface IBorrow {
    book: Ibook["_id"],
    quantity: Number,
    dueDate: Date
}



