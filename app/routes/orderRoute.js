import express from "express";

import {
    createOrder,
    getOrders,
    confirmOrder,
    cancelOrder,
    deleteOrder
} from "../controllers/orderController.js";
import { authenticate } from "../middleware/auth.js";


const router = express.Router();

router.patch("/confirmOrder", confirmOrder);

router.use(authenticate);

router.post("/createOrder", createOrder);
router.get("/", getOrders);
router.patch("/cancelOrder", cancelOrder);
router.patch("/deleteOrder", deleteOrder);

export default router;