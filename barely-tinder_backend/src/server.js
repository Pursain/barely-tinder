const express = require("express");
const session = require("express-session");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

// Boiler
let app = express();
app.use(session({ secret: "cats" }));
app.use(bodyParser.json());

// Start Server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server started on port ${port}`));

// Routes
app.use("/api/login", require("./routes/api/login"));
app.use("/auth", require("./routes/auth/oauth"));
