const express = require("express");
const mongoDBConnection = require("./config/db");
const morgan = require("morgan");
const { checkToken, checkRole } = require("./middlewares/middleware");
const UserRouter = require("./routes/user.routes");
const BookRouter = require("./routes/book.routes");
const app = express();
const cors = require("cors");

const PORT = 8080;

app.use(
    cors({
      origin: "*",
    })
  );
app.use(express.json());
app.use(
  morgan(":method :url :status :response-time ms - :res[content-length]")
);
// console.log(app.use(morgan("combined")), 'Logger Information')
app.get("/", (req, res) => {
    res.json({ message: "Hello from backend" });
  });





app.use("/user", UserRouter);
app.use("/books", BookRouter);

app.listen(PORT, async () => {
  try {
    await mongoDBConnection;
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.log("error while listening on port");
  }
});
