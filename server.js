import dotenv from "dotenv";
dotenv.config();

import express from "express"
import orderRoute from "./app/routes/orderRoute.js";
import authRoute from "./app/routes/authRoute.js";


const app = express();

app.use(express.json());

app.use("/auth", authRoute);
app.use("/orders", orderRoute); //Anything that has /orders in url gets routed to orderRoute

app.use((req, res) => {
  res.status(404).send("Not found");
  console.log("No paths match.");
});

const PORT = 3000; 
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}.`);
});
