import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import tagRoutes from "./routes/tag.js";
import resourceRoutes from "./routes/resource.js";
import favoriteRoutes from "./routes/favorite.js";  
import adminRoutes from "./routes/admin.js";


const app = express();
const PORT = 3000;
app.use(cors());

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/", userRoutes);
app.use("/resources", resourceRoutes);
app.use("/favorites", favoriteRoutes); 
app.use("/admin", adminRoutes);
app.use("/", tagRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
