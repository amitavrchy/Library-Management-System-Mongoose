import { Request, Response } from "express";
import Book from "../models/Book";
import Borrow from "../models/Borrow";

export const borrowBook = async (req: Request, res: Response) => {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(400).json({
                message: "Validation Failed",
                success: false,
                error: "Invalid ID"
            })
        }
        if (book?.copies < quantity) {
            return res.status(400).json({
                success: false,
                message: "Not enough copies available",
                error: `Requested: ${quantity}, Available: ${book.copies}`,
            });
        }

        const borrow = await Borrow.create({
            book: bookId,
            quantity,
            dueDate
        })
        book.copies = book.copies - quantity;
        if (book.copies <= 0) {
            book.available = false
        }
        await book.save();
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrow
        })
    }
    catch (error) {
        res.status(400).json({
            message: "Validation Failed",
            success: false,
            error: error
        })
    }
}

export const getBorrowSummary = async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book", 
          totalQuantity: { $sum: "$quantity" }, 
        },
      },
      {
        $lookup: {
          from: "books", 
          localField: "_id", 
          foreignField: "_id", 
          as: "bookDetails", 
        },
      },
      { $unwind: "$bookDetails" }, 
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve borrowed books summary",
      error: error.message,
    });
  }
};
