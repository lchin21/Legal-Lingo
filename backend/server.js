const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3500;

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/gemini", require("./routes/gemini"));
app.use("/translate", require("./routes/translate"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
