import express from "express";

import {
    createOrder,
    getOrders,
    updateOrderStatus,
    deleteOrder,
} from "../controllers/orderController.js";
import { authenticate } from "../middleware/auth.js";


const router = express.Router();

router.use(authenticate);

router.post("/create", createOrder);
router.get("/", getOrders);
router.patch("/:id/status", updateOrderStatus);
router.delete("/:id/delete", deleteOrder);

export default router;