import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/jwt.js";

const router = express.Router();
const prisma = new PrismaClient();

const EMAIL_DOMAIN = "@hr.nl";

router.post("/register", async (req, res) => {
  const { email, password, displayName } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  if (!email.endsWith(EMAIL_DOMAIN)) {
    return res.status(403).json({ message: "Only @hr.nl emails are allowed." });
  }

  const banned = await prisma.ban.findUnique({ where: { email } });
  if (banned) {
    return res.status(403).json({ message: "This email is banned." });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ message: "Email already registered." });
  }

  const user = await prisma.user.create({
  data: {
    email,
    passwordHash: password, 
    displayName: displayName || email.split("@")[0],
    },
  });


  return res.status(201).json({
    message: "User registered successfully",
    user: { id: user.id, email: user.email },
  });
});

// LOGIN route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  if (user.isBanned) {
    return res.status(403).json({ message: "User is banned." });
  }

 if (user.passwordHash !== password) {
    return res.status(401).json({ message: "Invalid password." });
  }

  const token = generateToken(user);

  res.status(200).json({
    message: "Login successful",
    token,
    user: {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      isAdmin: user.isAdmin,
    },
  });
});

export default router;
