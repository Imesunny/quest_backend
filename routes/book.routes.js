const express = require("express");

const BookModel = require("../models/books.model");
const { checkRole, checkToken } = require("../middlewares/middleware");
const BookRouter = express.Router();

BookRouter.post(
  "/add",
  checkToken,
  checkRole(["CREATOR"]),
  async (req, res) => {
    try {
      const { title, author } = req.body;
      const book = await BookModel.create({ title, author });
      res.json(book);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

BookRouter.get(
  "/",
  checkToken,
  checkRole(["CREATOR", "VIEW_ALL"]),
  async (req, res) => {
    try {
      const books = await BookModel.find().sort({ createdAt: -1 });
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

BookRouter.delete(
  "/:id",
  checkToken,
  checkRole(["CREATOR"]),
  async (req, res) => {
    try {
      const book = await BookModel.findByIdAndDelete(req.params.id);
      res.json(book);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

//additional API:

BookRouter.get("/new", async (req, res) => {
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
  try {
    const newBooks = await BookModel.find({
      createdAt: { $gte: tenMinutesAgo },
    });
    res.json(newBooks);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

BookRouter.get("/old", async (req, res) => {
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
  try {
    const oldBooks = await BookModel.find({
      createdAt: { $lt: tenMinutesAgo },
    });
    res.json(oldBooks);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = BookRouter;
