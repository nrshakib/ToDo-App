const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const todoSchema = require("../routeHandler/schema/todoSchema");

const Todo = new mongoose.model("Todo", todoSchema);

//todo routes
router.get("/", async (req, res) => {});
router.get("/:id", async (req, res) => {});

//insert single data
router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo
    .save()
    .then(() => {
      res.status(200).json({
        message: "Todo inserted succefully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: "An error occured",
        err,
      });
    });
});

//insert multiple data
router.post("/all", async (req, res) => {
  await Todo.insertMany(req.body)
    .then(() => {
      res.status(200).send({
        message: "Todo inserted Succesfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        error: "An error occured", err
      });
    });
});
router.put("/:id", async (req, res) => {});
router.delete("/:id", async (req, res) => {});

module.exports = router;
