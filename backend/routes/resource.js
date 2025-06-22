import express from "express";
import { PrismaClient } from "@prisma/client";
import authenticateToken from "../middleware/auth.js";
import isAdmin from "../utils/isAdmin.js"; 

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", authenticateToken, async (req, res) => {
  const { search, type } = req.query;

  try {
    const resources = await prisma.resource.findMany({
      where: {
        AND: [
          search
            ? {
                OR: [
                  { title: { contains: search, mode: "insensitive" } },
                  { description: { contains: search, mode: "insensitive" } }
                ]
              }
            : {},
          type ? { type: type } : {}
        ]
      },
      include: {
        resourceTags: { include: { tag: true } },
        user: {
          select: { id: true, email: true, displayName: true }
        }
      }
    });

    const resourcesWithRatings = await Promise.all(
      resources.map(async (resource) => {
        const avg = await prisma.rating.aggregate({
          _avg: { score: true },
          where: { resourceId: resource.id },
        });

        return {
          ...resource,
          averageRating: avg._avg.score || 0,
        };
      })
    );

    res.json(resourcesWithRatings);

    const formatted = resources.map((resource) => ({
      ...resource,
      tags: resource.resourceTags.map((rt) => rt.tag),
      resourceTags: undefined, 
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Error fetching resources:", error);
    res.status(500).json({ error: "Failed to fetch resources" });
  }
});


router.post("/resources", authenticateToken, async (req, res) => {
  const { title, url, description } = req.body;

  const resource = await prisma.resource.create({
    data: {
      title,
      url,
      description,
      user: { connect: { id: req.user.id } }
    }
  });

  res.status(201).json({ message: "Resource created", resource });
});

router.post("/resources/:resourceId/tags", authenticateToken, async (req, res) => {
  const { resourceId } = req.params;
  let { tagIds } = req.body;
  tagIds = [...new Set(tagIds)]; 

  try {
    const existing = await prisma.resourceTag.findMany({
      where: {
        resourceId,
        tagId: {
          in: tagIds,
        },
      },
      select: {
        tagId: true,
      },
    });

    const existingTagIds = existing.map((e) => e.tagId);
    const newTagIds = tagIds.filter((id) => !existingTagIds.includes(id));

    const created = await prisma.resourceTag.createMany({
      data: newTagIds.map((tagId) => ({
        resourceId,
        tagId,
      })),
      skipDuplicates: true,
    });

    res.status(200).json({ message: "Tags added", count: created.count });
  } catch (error) {
    console.error("Error adding tags:", error);
    res.status(500).json({ error: "Failed to add tags" });
  }
});

router.post("/:resourceId/rate", authenticateToken, async (req, res) => {
  const { resourceId } = req.params;
  const { score } = req.body;

  if (!score || score < 1 || score > 5) {
    return res.status(400).json({ error: "Score must be between 1 and 5." });
  }

  try {
    const rating = await prisma.rating.upsert({
      where: {
        userId_resourceId: {
          userId: req.user.id,
          resourceId,
        },
      },
      update: { score },
      create: {
        userId: req.user.id,
        resourceId,
        score,
      },
    });

    res.status(200).json({ message: "Rating saved", rating });
  } catch (error) {
    console.error("Error saving rating:", error);
    res.status(500).json({ error: "Failed to save rating" });
  }
});

router.post("/:resourceId/favorite", authenticateToken, async (req, res) => {
  const { resourceId } = req.params;

  try {
    const favorite = await prisma.favorite.upsert({
      where: {
        userId_resourceId: {
          userId: req.user.id,
          resourceId,
        },
      },
      update: {}, 
      create: {
        userId: req.user.id,
        resourceId,
      },
    });

    res.status(200).json({ message: "Favorited", favorite });
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).json({ error: "Failed to add favorite" });
  }
});

router.delete("/:resourceId/favorite", authenticateToken, async (req, res) => {
  const { resourceId } = req.params;

  try {
    await prisma.favorite.delete({
      where: {
        userId_resourceId: {
          userId: req.user.id,
          resourceId,
        },
      },
    });

    res.status(200).json({ message: "Favorite removed" });
  } catch (error) {
    console.error("Error removing favorite:", error);
    res.status(500).json({ error: "Failed to remove favorite" });
  }
});

router.delete("/:id", authenticateToken, isAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.rating.deleteMany({ where: { resourceId: id } });
    await prisma.favorite.deleteMany({ where: { resourceId: id } });
    await prisma.resourceTag.deleteMany({ where: { resourceId: id } });

    const deleted = await prisma.resource.delete({
      where: { id }
    });

    res.json({ message: "Resource deleted", resource: deleted });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete resource" });
  }
});

export default router;
