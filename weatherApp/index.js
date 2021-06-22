const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;

const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "app", "home.html"));
});

app.use(express.static(path.join(__dirname, "app")));

app.listen(PORT, () =>
  console.log(`server running on PORT ${PORT} .... hello there`)
);
