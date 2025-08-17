const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const lookRoutes = require("./routes/lookRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/looks", lookRoutes);
app.use("/api/schedule", scheduleRoutes);

module.exports = app;
