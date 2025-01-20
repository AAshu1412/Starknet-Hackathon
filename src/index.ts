import express from "express";
import userRoutes from "./routes/user";
import pricingRoutes from "./routes/priceupdate"
import likeRouter from "./routes/likes"
import commentRouter from "./routes/comments"
const app = express();


app.use("/api", userRoutes);
app.use("/api", pricingRoutes);
app.use("/api", commentRouter)
app.use('/api', likeRouter)
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
