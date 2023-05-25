const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const todoSchema = require("../routeHandler/schema/todoSchema");

const Todo = new mongoose.model("Todo", todoSchema);

//todo routes
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find()
      .select({
        _id: 0,
        __v: 0,
        date: 0,
      })
      .limit(3);
    if (todos) {
      res.status(200).json(todos);
    } else {
      res.status(404).json({
        message: "Todos not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "There was an error",
    });
  }
});

//find todo by properties / id
router.get("/:id", async (req, res) => {
  try {
    const todos = await Todo.find({ _id: req.params.id }).select({
      _id: 0,
      __v: 0,
      date: 0,
    });
    if (todos) {
      res.status(200).json(todos);
    } else {
      res.status(404).json({
        message: "Todos not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "There was an error",
    });
  }
});

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
        error: "An error occured",
        err,
      });
    });
});

//update data
router.put("/:id", async (req, res) => {
  await Todo.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        title: "MD",
      },
    },
    { new: true }
  )
    .then(() => {
      res.status(201).send({
        message: "Data Updated Succesfully",
      });
    })
    .catch((err) => {
      error: "Updation Error Occured";
    });
});

//delete by id
router.delete("/:id", async (req, res) => {
  try {
    const deleteTodo = await Todo.findByIdAndDelete({ _id: req.params.id });
    if (deleteTodo) {
      res.status(200).json({
        message: "Deleted Succesfully",
        data: deleteTodo,
      });
    } else {
      res.status(500).json({
        message: "There was an error",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});

module.exports = router;
