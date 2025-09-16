import { Request, Response } from "express";
import Book from "../models/Book";

export const createBook = async (req: Request, res: Response) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json({
            success: true,
            message: "Book created Successfully",
            data: book
        });
    }
    catch (error: any) {
        res.status(400).json({
            message: "Validation Failed",
            success: false,
            error: error

        })
    }
}

export const getBooks = async (req: Request, res: Response) => {
    try {
        const { filter, sortBy = "createdAt", sort = "desc", limit = "10" } = req.query;
        const query: any = {};
        if (filter) {
            query.genre = filter
        }
        const total = parseInt(limit as string);
        const sortDirection = sort === "asc" ? 1 : -1;
        const books = await Book.find(query).sort({ [sortBy as string]: sortDirection }).limit(total);
        res.json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error: any) {
        res.status(400).json({
            message: "Validation Failed",
            success: false,
            error: error
        })
    }
}

export const getBookById = async (req: Request, res: Response) => {
    try {
        const { bookId } = req.params;
        const book = await Book.findById(bookId);
        res.json({
            success: true,
            message: "Book retrieved successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Validation Failed",
            success: false,
            error: error
        })
    }
}

export const updateBook = async (req: Request, res: Response) => {
    try {
        const { bookId } = req.params;
        const updates = req.body;
        const updatedBook = await Book.findByIdAndUpdate(bookId, updates, { new: true, runValidators: true });
        res.status(200).json({
            success: true,
            message: "Book updated Successfully",
            data: updatedBook
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

export const deleteBook = async (req: Request, res: Response) => {
    try {
        const { bookId } = req.params;
        const deletedBook = await Book.findByIdAndDelete(bookId);
        res.status(200).json({
            "success": true,
            "message": "Book deleted successfully",
            "data": null
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