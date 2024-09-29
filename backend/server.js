const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/gemini", require("./routes/gemini"));
app.use("/translate", require("./routes/translate"));

// Add a health check endpoint
app.get("/_ah/health", (req, res) => {
  res.status(200).send("OK");
});

const port = parseInt(process.env.PORT) || 3500;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
