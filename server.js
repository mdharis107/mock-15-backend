const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { userController } = require("./routes/user.routes");
const { authentication } = require("./middlewares/authentication");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("This is the Home Page");
});

app.use("/user", userController);

app.use(authentication)

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to db");
  } catch (err) {
    console.log("Error connecting to DB");
    console.log(err);
  }
  console.log(`listening on PORT ${PORT}`);
});
