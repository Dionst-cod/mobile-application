import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
import authenticateToken from "../middleware/auth.js";

const prisma = new PrismaClient();

router.get("/tags", async (req, res) => {
  const tags = await prisma.tag.findMany({
    include: {
      resources: true,
    },
  });
  res.json(tags);
});

router.post("/tags", authenticateToken, async (req, res) => {
  const { name } = req.body;

  const tag = await prisma.tag.create({
    data: { name },
  });

  res.status(201).json({ message: "Tag created", tag });
});


router.post("/resources/:id/tags", authenticateToken, async (req, res) => {
  const resourceId = req.params.id;
  const { tagIds } = req.body;

  try {
    const createdLinks = await Promise.all(
      tagIds.map((tagId) =>
        prisma.resourceTag.create({
          data: {
            resource: { connect: { id: resourceId } },
            tag: { connect: { id: tagId } }
          }
        })
      )
    );

    res.status(200).json({ message: "Tags added", count: createdLinks.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add tags" });
  }
});

export default router;
