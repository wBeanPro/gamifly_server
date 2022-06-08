require("dotenv").config();
const express = require("express");
const fileUpload = require('express-fileupload');
var auth = require('./routes/auth');
var api = require('./routes/api');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Gamifly." });
});
app.use('/auth', auth);
app.use('/api', api);
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});