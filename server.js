import "dotenv/config"

import express from "express"
import orderRoute from "./app/routes/orderRoute.js";
import authRoute from "./app/routes/authRoute.js";
import userRoute from "./app/routes/userRoute.js";
import productRoute from "./app/routes/productRoute.js";


const app = express();

app.use(express.json());

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/orders", orderRoute);

app.use((req, res) => {
  res.status(404).send("Not found");
  console.log("No paths match.");
});

const PORT = 3000; 
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}.`);
});

////////////////////////////////////////////////////////////////////
// ISSUE: Old token still works after new token is generated.
////////////////////////////////////////////////////////////////////