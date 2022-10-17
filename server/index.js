/* eslint-disable */

const express = require("express");
require("dotenv").config({ path: "../.env" });
const path = require("path");
const app = express();
console.log(process.env.PORT);
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../dist/")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
