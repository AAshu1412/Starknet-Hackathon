import express from "express";
import bodyParser from "body-parser";

const PORT = process.env.POST || 3000;
const app = express();
app.use(bodyParser.json());

const CONTRACT_ADDRESS = '0x0589e7208b481b31450a7dddab59416c1b0805bfd0d2e4dc5ea047bd3b78c10d';
const ABI = './abis/contract-abi.json';



app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
