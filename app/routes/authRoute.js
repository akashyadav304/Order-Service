import express from "express"

import {
    signup,
    loginEmail,
    loginPhone
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login-email", loginEmail);
router.post("/login-phone", loginPhone);

export default router;