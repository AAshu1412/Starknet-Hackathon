import express from "express"
import { PrismaClient } from "@prisma/client";

const app = express.Router();
const prisma = new PrismaClient();

app.use(express.json());

// Get user profile by ID (wallet address)
app.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        followers: true,
        following: true,
      },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/user/:id", async (req, res) => {
  const { id } = req.params;
  const { username, displayName, pfp } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { username, displayName, pfp },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/user", async (req, res) => {
  const { id, username, displayName, pfp } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: { id, username, displayName, pfp },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default app
