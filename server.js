require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ussdRoutes = require("./routes/ussdRoutes");
const connectDB = require('./config/db');
connectDB();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/ussd", ussdRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Hlolimpilo USSD service running on port ${PORT}`));
