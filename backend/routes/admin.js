import express from "express";
import { PrismaClient } from "@prisma/client";
import authenticateToken from "../middleware/auth.js";
import isAdmin from "../utils/isAdmin.js";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/ban-email", authenticateToken, isAdmin, async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "E-mailadres is verplicht." });
  }

  try {
    const existingBan = await prisma.ban.findUnique({ where: { email } });
    if (existingBan) {
      return res.status(409).json({ message: "Dit e-mailadres is al geblokkeerd." });
    }

    await prisma.ban.create({ data: { email } });
    res.status(200).json({ message: `Geblokkeerd: ${email}` });
  } catch (error) {
    console.error("Ban error:", error);
    res.status(500).json({ message: "Kon e-mailadres niet blokkeren." });
  }
});

router.post("/promote", authenticateToken, isAdmin, async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "E-mailadres is verplicht." });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Gebruiker niet gevonden." });
    }

    if (user.isAdmin) {
      return res.status(409).json({ message: "Gebruiker is al admin." });
    }

    await prisma.user.update({
      where: { email },
      data: { isAdmin: true },
    });

    res.status(200).json({ message: `${email} is gepromoveerd tot admin.` });
  } catch (error) {
    console.error("Promotie fout:", error);
    res.status(500).json({ message: "Kon adminrechten niet toekennen." });
  }
});

router.get("/banned", authenticateToken, isAdmin, async (req, res) => {
  try {
    const bans = await prisma.ban.findMany({ select: { email: true, createdAt: true } });
    res.status(200).json({ count: bans.length, bans });
  } catch (error) {
    console.error("Fout bij ophalen bans:", error);
    res.status(500).json({ message: "Fout bij ophalen van geblokkeerde e-mails." });
  }
});

export default router;
