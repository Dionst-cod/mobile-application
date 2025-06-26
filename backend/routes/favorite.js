import express from "express";
import { PrismaClient } from "@prisma/client";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", authenticateToken, async (req, res) => {
  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId: req.user.id },
      include: { resource: true }
    });

    const resourceIds = favorites.map(fav => fav.resourceId);
    res.json(resourceIds);
  } catch (error) {
    console.error("Fout bij ophalen favorieten:", error);
    res.status(500).json({ error: "Interne serverfout" });
  }
});

router.post("/:resourceId", authenticateToken, async (req, res) => {
  const resourceId = req.params.resourceId; 
  const userId = req.user.id;

  if (!resourceId) {
    return res.status(400).json({ error: "Ongeldig resourceId" });
  }

  console.log("→ Favorite toggle aangeroepen voor userId:", userId, "resourceId:", resourceId);

  try {
    const existingFavorite = await prisma.favorite.findFirst({
      where: { userId, resourceId },
    });

    if (existingFavorite) {
      await prisma.favorite.delete({ where: { id: existingFavorite.id } });
      return res.status(200).json({ message: "Favoriet verwijderd" });
    }

    await prisma.favorite.create({
      data: { userId, resourceId },
    });

    return res.status(201).json({ message: "Favoriet toegevoegd" });

  } catch (error) {
    console.error("FOUT in favorite toggle:", error);
    res.status(500).json({ error: "Interne serverfout", details: error.message });
  }
});



router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const resourceId = req.params.id;

    await prisma.favorite.deleteMany({
      where: {
        userId: req.user.id,
        resourceId,
      },
    });

    res.json({ message: "Verwijderd uit favorieten" });
  } catch (error) {
    console.error("❗ Fout bij verwijderen van favorieten:", error);
    res.status(500).json({ message: "Fout bij verwijderen van favorieten" });
  }
});

export default router;
