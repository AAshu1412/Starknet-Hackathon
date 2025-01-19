import express from "express";
import userRoutes from "./routes/user";
import pricingRoutes from "./routes/priceupdate"

const app = express();


app.use("/api", userRoutes);
app.use("/api", pricingRoutes);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
