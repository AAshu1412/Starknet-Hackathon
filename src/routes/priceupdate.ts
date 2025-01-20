import { Router } from "express";

const app = Router();

app.get("/price/:id", (req, res) => {
  // get the likes, comments and views from the db
  
  // every nft's base price would be 0.0003 ETH
  // a write a algorythm that would increase
  // it's price on the basis of the engagement
  // once the price is final push it in to the array
  // and it returns the lastest price to the frontend to show
});

export default app;