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

  } catch (error) {
    console.error("Error fetching resources:", error);
    res.status(500).json({ error: "Failed to fetch resources" });
  }
});


router.post("/", authenticateToken, async (req, res) => {
  console.log("Ontvangen body:", req.body);

  const { title, url, description, type } = req.body;

  const resource = await prisma.resource.create({
    data: {
      title,
      url,
      description,
      type,
      user: { connect: { id: req.user.id } }
    }
  });
  res.status(201).json({ message: "Resource created", resource });
});

router.post("/:resourceId/tags", authenticateToken, async (req, res) => {
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

router.post('/:resourceId/rate', authenticateToken, async (req, res) => {
  console.log('🎯 Bereikt:', req.params.resourceId);
  console.log('🧑‍🦱 Gebruiker:', req.user); 
  const { resourceId } = req.params;
  const { score } = req.body;

  try {
    const existingRating = await prisma.rating.findFirst({
    where: {
      userId: req.user.id,
      resourceId: resourceId
    }
  });

  let rating;

  if (existingRating) {
    rating = await prisma.rating.update({
      where: {
        id: existingRating.id
      },
      data: {
        score: parseInt(score)
      }
    });
  } else {
    rating = await prisma.rating.create({
      data: {
        score: parseInt(score),
        resource: { connect: { id: resourceId } },
        user: { connect: { id: req.user.id } }
      }
    });
  }

  res.json(rating);

  } catch (error) {
    console.error('Fout bij opslaan rating:', error);
    res.status(500).json({ error: 'Interne fout bij opslaan rating' });
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

router.get("/favorites", authenticateToken, async (req, res) => {
  const favorites = await prisma.favorite.findMany({
    where: { userId: req.user.id },
    include: { resource: true },
  });

  res.json(favorites.map((fav) => fav.resourceId));
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
