require("dotenv").config();
const express = require("express");
const app = express();

const authRoutes = require("./routes/auth");
const authenticateToken = require("./middleware/auth");

app.use(express.json());
app.use("/auth", authRoutes);

app.get("/profile", authenticateToken, (req, res) => {
  res.json({
    message: "Access granted to protected route ✅",
    user: req.user
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
