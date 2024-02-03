require("express-async-errors");

const cors = require("cors");
const express = require("express");

const app = express();


const dotenv = require("dotenv");
dotenv.config();
const morgan = require("morgan");

const connectDB = require("./db/connect.js");

const musicRouter = require('./routes/musicRoute.js');




app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());



app.use("/api/v1/music", musicRouter);




const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
