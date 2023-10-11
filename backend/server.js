require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors package
const userRoutes = require("./routes/userRoutes");
const employerRoutes = require("./routes/employerRoutes");
const jobListingRoutes = require("./routes/jobListingRoutes");
const productRoutes = require("./routes/productRoutes");
const purcaseRoutes = require("./routes/purchaseRoutes");
const cookieParser = require("cookie-parser");
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
    origin: "http://localhost:3000", // replace with your frontend application's URL
    credentials: true,
  })
);

app.use("/user", userRoutes);
app.use("/employer", employerRoutes);
app.use("/joblisting", jobListingRoutes);
app.use("/product", productRoutes);
app.use("/purchase", purcaseRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
