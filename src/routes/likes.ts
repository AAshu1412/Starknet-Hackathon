import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express.Router();



app.post("/nft/like", async (req, res) => {
  const { userId, tokenId } = req.body;

  if (!userId || !tokenId) {
    res.status(400).json({ error: "Missing userId or tokenId" });
    return;
  }

  try {
    const existingLike = await prisma.nFTLike.findFirst({
      where: { userId, tokenId },
    });

    if (existingLike) {
      res.status(400).json({ error: "User has already liked this NFT" });
      return;
    }

    await prisma.nFTLike.create({
      data: {
        userId,
        tokenId,
        engagement: { connect: { id: userId } },
      },
    });

    res.status(200).json({ message: "Like added successfully" });
  } catch (error) {
    console.error("Error adding like:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/like", async (req, res) => {
  const { userId, tokenId } = req.body;

  if (!userId || !tokenId) {
    res.status(400).json({ error: "Missing userId or tokenId" });
    return;
  }

  try {
    const deletedLike = await prisma.nFTLike.deleteMany({
      where: { userId, tokenId },
    });

    if (deletedLike.count === 0) {
      res.status(404).json({ error: "Like not found" });
      return;
    }

    res.json({ message: "Like removed successfully" });
  } catch (error) {
    console.error("Error deleting like:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default app;