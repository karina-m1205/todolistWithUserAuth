require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const itemsRouter = require("./api/items.js");
const requestProcessingStartTime = require("./core/requestProcessingStartTime.js");
const PORT = process.env.PORT;
const mongoURI = process.env.mongoURI;


mongoose.connect(mongoURI);
const app = express();

app.use(bodyParser.json());
app.use(requestProcessingStartTime)
app.use("/items", itemsRouter);

app.listen(PORT, () => {
    console.log(`app listen on http://localhost:${PORT}`);
});
