const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const user = require("./Controller/user"); // Assuming user controller is exported properly
const Port = process.env.PORT || 5000; // Use environment variable or default to 8000

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(
  "mongodb+srv://shashwat100k:shashwat@cluster0.rnttykz.mongodb.net",
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => {
  console.log("MongoDB connection successfully established");
})
.catch((err) => {
  console.error("MongoDB connection failed:", err);
});

app.post("/signup", user.signup);
app.post("/signin", user.signin);
app.post("/userdata", user.userData);
app.get("/", (req, res) => {
  res.send("Successfully hosted Netflix API..");
});

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
