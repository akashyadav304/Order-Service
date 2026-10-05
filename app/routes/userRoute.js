import express from "express"
import {
    getUser,
    updateName,
    updateEmail,
    updatePhone,
    updatePassword,
    updateAddress,
    deleteUser
} from "../controllers/userController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.use(authenticate);

router.get("/userDetail", getUser);
router.patch("/updateName", updateName);
router.patch("/updateEmail", updateEmail);
router.patch("/updatePhone", updatePhone);
router.patch("/updatePassword", updatePassword);
router.patch("/updateAddress", updateAddress);
router.patch("/deleteUser", deleteUser);

export default router;