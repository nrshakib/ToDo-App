const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const todoSchema = require("../routeHandler/schema/todoSchema");

const Todo = new mongoose.model("Todo", todoSchema);

//todo routes
router.get("/", async (req, res) => {});
router.get("/:id", async (req, res) => {});
router.post("/", async (req, res) => {});
router.post("/all", async (req, res) => {});
router.put("/:id", async (req, res) => {});
router.delete("/:id", async (req, res) => {});

module.exports = router;
