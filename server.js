const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const recipeRoutes = require("./routes/recipeRoutes");
const ytRoutes = require("./routes/ytRecipeRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.use("/api/recipes", recipeRoutes);
app.use("/api/yt", ytRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
