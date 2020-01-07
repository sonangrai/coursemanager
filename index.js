//  index.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(bodyParser.json());

//mongoose.Promise = global.Promise;　DB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, () =>
    console.log("Db COnnected")
);

//User Route Middlewares
const authRoute = require("./routes/auth");
app.use("/api/user", authRoute);
const courseRoute = require("./routes/course");
app.use("/api/courses", courseRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
});