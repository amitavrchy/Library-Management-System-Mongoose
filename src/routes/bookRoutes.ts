import express from "express";
import {
  createBook,
  getBookById,
  updateBook,
  deleteBook,
  getBooks,
} from "../controllers/bookController";

const router = express.Router();

router.post("/", createBook);
router.get("/", getBooks);
router.get("/:bookId", getBookById);
router.put("/:bookId", updateBook);
router.delete("/:bookId", deleteBook);

export default router;
