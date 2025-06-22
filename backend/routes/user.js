import express from "express";
import { generateToken } from "../utils/jwt.js";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
import authenticateToken from "../middleware/auth.js";
import isAdmin from "../utils/isAdmin.js";

const prisma = new PrismaClient();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  if (password !== user.passwordHash) {
  return res.status(401).json({ error: "Invalid email or password" });
  }


  const token = generateToken(user); 
  res.json({ token });
});

router.get("/me", authenticateToken, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: {
      id: true,
      email: true,
      displayName: true,
      isAdmin: true
    }
  });

  res.json(user);
});

router.patch("/me", authenticateToken, async (req, res) => {
  const { displayName, password } = req.body;

  const dataToUpdate = {};
  if (displayName) dataToUpdate.displayName = displayName;
  if (password) {
    dataToUpdate.passwordHash = password;
  }


  const updated = await prisma.user.update({
    where: { id: req.user.id },
    data: dataToUpdate,
    select: {
      id: true,
      email: true,
      displayName: true,
      isAdmin: true
    }
  });

  res.json({ message: "Profile updated", user: updated });
});

router.get("/me/favorites", authenticateToken, async (req, res) => {
  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId: req.user.id },
      include: {
        resource: {
          include: {
            user: {
              select: { id: true, email: true, displayName: true }
            },
            resourceTags: {
              include: { tag: true }
            }
          }
        }
      }
    });

    const resources = favorites.map((fav) => fav.resource);

    res.json(resources);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
});

router.patch("/admin/:id/ban", authenticateToken, isAdmin, async (req, res) => {
  const { id } = req.params;
  const { ban } = req.body; 

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { isBanned: ban },
    });

    res.json({
      message: ban ? "User banned" : "User unbanned",
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        isBanned: updatedUser.isBanned,
      },
    });
  } catch (error) {
    console.error("Error updating user ban status:", error);
    res.status(500).json({ error: "Failed to update user status" });
  }
});

export default router;
