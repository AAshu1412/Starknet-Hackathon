import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = Router();

app.post("/api/view", async (req, res) => {
  const { userId, tokenId } = req.body;

  if (!userId || !tokenId) {
    res.status(400).json({ error: "Missing userId or tokenId" });
    return;
  }

  try {
    const newView = await prisma.nFTView.upsert({
      where: { userId_tokenId: { userId, tokenId } },
      update: {},
      create: {
        userId,
        tokenId,
        engagement: { connect: { id: userId } },
      },
    });
    res.status(201).json(newView);
  } catch (error) {
    console.error("Error adding view:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
