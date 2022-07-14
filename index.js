const express = require("express");
const bodyParser = require("body-parser");

const postRoutes = require("./routes/posts");
const app = express();

const PORT = 3010;

app.use(bodyParser.json());
app.use("/posts", postRoutes);

// Routing
app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

app.listen(PORT, () => {
  console.log(`APP is running on PORT 1 ${PORT}`);
});
