require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const employerRoutes = require("./routes/employerRoutes");
const jobListingRoutes = require("./routes/jobListingRoutes");
const productRoutes = require("./routes/productRoutes");
const purcaseRoutes = require("./routes/purchaseRoutes");
const twoFARoutes = require("./routes/twoFARoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: "3013_db",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://localhost", "https://sitgigs.online", "https://www.sitgigs.online"], // replace with your frontend application's URL
    credentials: true,
  })
);

// Create CSRF Token
app.use(csrf({
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true
  }
}));

// Use CSRF Token in all request
app.use((req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken()); // Default cookie name for CSRF in Axios
  next();
});

app.use("/user", userRoutes);
app.use("/employer", employerRoutes);
app.use("/joblisting", jobListingRoutes);
app.use("/product", productRoutes);
app.use("/purchase", purcaseRoutes);
app.use("/twofa", twoFARoutes);
app.use("/transaction", transactionRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
