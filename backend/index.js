const express = require("express");
const { PORT } = require("./env");
const { mainRouter } = require("./routes");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRouter);

app.listen(PORT, () => {
  console.log("Server running on", PORT);
});
