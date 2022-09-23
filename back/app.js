const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// const tourRouter = require("./routes/tourRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());


app.use("/api/v1/auth", authRoutes);

module.exports = app;