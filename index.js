const express = require("express");
const app = express();

const port = process.env.PORT || 5000;

app.use(express.static("assets"));

app.get("/", function (req, res) {
    res.sendFile("index.html");
  });
  

app.listen(port, function () {
    console.log(`Editor listening on port ${port}!`);
  });