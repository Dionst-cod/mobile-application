import "dotenv/config";
import express from "express";
import tagRoutes from "./routes/tag.js";
import resourceRoutes from "./routes/resource.js";
import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";
import authenticateToken from "./middleware/auth.js";

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/", userRoutes);
app.use("/admin/resources", resourceRoutes);
app.use("/", tagRoutes);

app.get("/profile", authenticateToken, (req, res) => {
  res.json({
    message: "Access granted to protected route ✅",
    user: req.user
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
