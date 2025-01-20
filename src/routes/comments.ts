import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = Router();

app.post("/api/comment", async (req, res) => {
  const { userId, tokenId, content } = req.body;
  if (!userId || !tokenId || !content) {
    res.status(400).json({ error: "Missing userId, tokenId, or content" });
    return;
  }

  try {
    const newComment = await prisma.nFTcomment.create({
      data: {
        userId,
        tokenId,
        content,
        engagement: { connect: { id: userId } }, // Link to engagement
      },
    });
    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/comment", async (req, res) => {
  const { commentId } = req.body;
  if (!commentId) {
    res.status(400).json({ error: "Missing comment ID" });
    return;
  }

  try {
    const deletedComment = await prisma.nFTcomment.delete({
      where: { id: commentId },
    });
    res.json({ message: "Comment removed successfully", deletedComment });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default app;