const express = require("express");
const mongoose = require("mongoose");

//app initialization
const app = express();
const port = 3000;
app.use(express.json());

//db connect with mongoose
mongoose
  .connect("mongodb://localhost:27017/todo")
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

//default error handler
function errorHandler(err, req, res, next) {
  if (res.headerSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}

app.listen(port, () => {
  console.log(`Server listening at port http://localhost:${port}`);
});
