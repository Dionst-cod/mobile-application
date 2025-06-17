const { generateToken } = require("../utils/jwt");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
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

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: hashed,
      displayName: displayName || email.split("@")[0],
    },
  });

  return res.status(201).json({ message: "User registered successfully", user: { id: user.id, email: user.email } });
});


const jwt = require("jsonwebtoken");

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

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
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
      isAdmin: user.isAdmin
    }
  });
});

module.exports = router;

